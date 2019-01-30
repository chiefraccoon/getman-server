import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesResolvers } from './rides.resolvers';

@Module({
  providers: [RidesService, RidesResolvers],
})
export class RidesModule {}
