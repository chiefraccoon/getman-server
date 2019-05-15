import { ObjectId } from 'mongoose';
import * as moment from 'moment';
import { sum } from 'lodash';
import { Injectable } from '@nestjs/common';

import Stats from './stats.model';
import Car from '../cars/car.model';
import { RidesService } from '../rides/rides.service';

@Injectable()
export class StatsService {
  constructor(private readonly ridesService: RidesService) {
  }

  async updateRecords() {
    const carsList = await Car.find();
    carsList.map(carItem => {
      this.calculateCarStats(carItem.id).then(data => {
        (new Stats({
          car: carItem.id,
          ...data,
        }))
          .update({ upsert: true })
          .then(() => {
            console.log('Update processed for car!', carItem.id);
          })
          .catch(err => {
            console.error(err, carItem.id);
          });
      });
    });
  }

  calculateCarStats(carId: string) {
    return this.ridesService.findByCarId(carId)
      .then(data => {
        const groupedRides = data
          .filter(rideItem => rideItem.endedAt > rideItem.startedAt)
          .reduce((grouped, rideItem) => {
            const groupKey = (moment(rideItem.startedAt)).format('l');
            grouped[groupKey] = grouped[groupKey] || [];
            grouped[groupKey].push(rideItem);
            return grouped;
          }, {});

        const groupedByPeriod = Object.keys(groupedRides)
          .reduce((grouped, groupKey) => {
            const periodItem = groupedRides[groupKey];
            const durations = periodItem.map(rideItem => {
              return (rideItem.endedAt - rideItem.startedAt) / (60 * 1000); // minutes
            });
            grouped[groupKey] = durations;
            return grouped;
          }, {});

        const averageByPeriod = Object.keys(groupedByPeriod)
          .reduce((result, key) => {
            const rides = groupedByPeriod[key];
            const count = 1 + rides.length;
            const duration = Math.ceil(sum(rides) / count);
            const load = (sum(rides) / (24 * 60)) * 100;
            result[key] = {
              duration,
              count,
              load,
            };
            return result;
          }, {});

        const periodsCount = Object.keys(averageByPeriod).length;
        const periodsSum = Object.keys(averageByPeriod)
          .reduce((result, key) => {
            const period = averageByPeriod[key];
            result.countSum = period.count + result.countSum;
            result.durationSum = period.duration + result.durationSum;
            result.loadSum = period.load + result.loadSum;
            return result;
          }, { countSum: 0, durationSum: 0, loadSum: 0 });

        const averageTotal = {
          count: periodsSum.countSum / periodsCount,
          duration: periodsSum.durationSum / periodsCount,
          load: periodsSum.loadSum / periodsCount,
          load2: (periodsSum.durationSum * periodsSum.countSum * 100) / (24 * 60 * Math.pow(periodsCount, 2)),
        };

        return averageTotal;
      });

  }
}

//StatsService.updateRecords();