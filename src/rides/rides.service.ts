import { Injectable } from '@nestjs/common';

import Ride from './ride.model';

const newCollectingPeriodStart = '05/01/2019';

@Injectable()
export class RidesService {
    async findAll(): Promise<any> {
        return await Ride.find({startedAt: {$gte: new Date(newCollectingPeriodStart)}});
    }

    async findOneById(id: string): Promise<any> {
        return await Ride.find({
            id,
            startedAt: {$gte: new Date(newCollectingPeriodStart)},
        });
    }

    async findByCarId(carId: string): Promise<any> {
        return await Ride.find({
            car: carId,
            startedAt: {$gte: new Date(newCollectingPeriodStart)},
        });
    }
}
