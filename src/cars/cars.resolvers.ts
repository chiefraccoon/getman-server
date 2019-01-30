import { Args, Query, Resolver } from '@nestjs/graphql';

// import { Car } from './interfaces/car.interface';
import { CarsService } from './cars.service';

@Resolver('Car')
export class CarsResolvers {
    constructor(private readonly carsService: CarsService) {}

    @Query('cars')
    async getCars() {
        return await this.carsService.findAll();
    }

    @Query('car')
    async findOneById(
      @Args('id')
        id: string,
    ) {
        return await this.carsService.findOneById(id);
    }
}