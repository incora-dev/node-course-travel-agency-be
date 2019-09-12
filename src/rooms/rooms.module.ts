import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import {roomProviders} from './room.providers';
import {tourProviders} from '../tours/tour.providers';
import {DatabaseModule} from '../core/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
      RoomsService,
      ...roomProviders,
      ...tourProviders],
  controllers: [RoomsController],
})
export class RoomsModule {}
