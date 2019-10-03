import {Module, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import {DatabaseModule} from '../core/database.module';
import {tourProviders} from './tour.providers';
import {TourIsExistMiddleware} from '../middlewares/tour.isExist.middleware';
import {serviceProviders} from '../services/service.providers';
import {hotelProviders} from '../hotel/hotel.providers';
import {roomProviders} from '../rooms/room.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
      ToursService,
      ...tourProviders,
      ...serviceProviders,
      ...hotelProviders,
      ...roomProviders,
  ],
  controllers: [ToursController],
})
export class ToursModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(TourIsExistMiddleware)
        .forRoutes(
            {path: 'tours/:id', method: RequestMethod.GET},
            {path: 'tours/:id', method: RequestMethod.PUT},
            {path: 'tours/:id', method: RequestMethod.DELETE},
        );
  }
}
