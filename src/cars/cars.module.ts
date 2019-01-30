import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolvers } from './cars.resolvers';

@Module({
  providers: [CarsService, CarsResolvers],
})
export class CarsModule {}
