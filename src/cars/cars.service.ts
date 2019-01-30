import { Injectable } from '@nestjs/common';
import { sum, pick } from 'lodash';

import Car from './car.model';
import Stats from '../stats/stats.model';

@Injectable()
export class CarsService {
  async findAll(): Promise<any> {
    const carsData = await Car.find();
    const statsData = await Stats.find();
    return carsData.map(carItem => {
      const stats = statsData.find(statsItem => {
        return statsItem.car.equals(carItem.id);
      });

      return ({
        ...carItem.toObject(),
        stats,
      });
    });
  }

  async findOneById(id: string): Promise<any> {
    const carData = await Car.findById(id);
    const carStats = await Stats.findOne({car: id});

    return {
      ...carData.toObject(),
      stats: carStats.toObject(),
    };
  }
}
