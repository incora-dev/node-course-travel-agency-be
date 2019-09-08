import {Module, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import {DatabaseModule} from '../core/database.module';
import {tourProviders} from './tour.providers';
import {TourIsExistMiddleware} from 'src/middlewares/tour.isExist.middleware';

@Module({
  imports: [DatabaseModule],
  providers: [ToursService, ...tourProviders],
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
