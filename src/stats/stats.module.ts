import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { RidesService } from '../rides/rides.service';

@Module({
  controllers: [StatsController],
  providers: [StatsService, RidesService],
})
export class StatsModule {}
