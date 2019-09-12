import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import {DatabaseModule} from 'src/core/database.module';
import {roomProviders} from './room.providers';

@Module({
  imports: [DatabaseModule],
  providers: [RoomsService, ...roomProviders],
  controllers: [RoomsController],
})
export class RoomsModule {}
