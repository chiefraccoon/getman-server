import { Injectable } from '@nestjs/common';

import Ride from './ride.model';

@Injectable()
export class RidesService {
    async findAll(): Promise<any> {
        return await Ride.find();
    }

    async findOneById(id: string): Promise<any> {
        return await Ride.findById(id);
    }

    async findByCarId(carId: string): Promise<any> {
        return await Ride.find({
            car: carId,
        });
    }
}
