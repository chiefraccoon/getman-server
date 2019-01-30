import { Args, Query, Resolver } from '@nestjs/graphql';

// import { Car } from './interfaces/car.interface';
import { RidesService } from './rides.service';

@Resolver('Ride')
export class RidesResolvers {
  constructor(private readonly ridesService: RidesService) {
  }

  @Query('rides')
  async getCars() {
    return await this.ridesService.findAll();
  }

  @Query('ride')
  async findOneById(
    @Args('id')
      id: string,
  ) {
    return await this.ridesService.findOneById(id);
  }

  @Query('ridesByCar')
  async findByCarId(
    @Args('id')
      id: string,
  ) {
    return await this.ridesService.findByCarId(id);
  }
}
