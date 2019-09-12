import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import {roomProviders} from './room.providers';
import {tourProviders} from '../tours/tour.providers';
import {DatabaseModule} from '../core/database.module';
import {RoomIsExistMiddleware} from '../middlewares/room.isExist.middleware';

@Module({
  imports: [DatabaseModule],
  providers: [
      RoomsService,
      ...roomProviders,
      ...tourProviders],
  controllers: [RoomsController],
})
export class RoomsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RoomIsExistMiddleware)
            .forRoutes(
                {path: 'rooms/:id', method: RequestMethod.GET},
                {path: 'rooms/:id', method: RequestMethod.PUT},
                {path: 'rooms/:id', method: RequestMethod.DELETE},
            );
    }
}
