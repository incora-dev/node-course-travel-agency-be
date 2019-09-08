import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import {DatabaseModule} from '../core/database.module';
import {tourProviders} from './tour.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ToursService, ...tourProviders],
  controllers: [ToursController],
})
export class ToursModule {}
