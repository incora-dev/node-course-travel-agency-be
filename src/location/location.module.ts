import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { DatabaseModule } from '../core/database.module';
import { locationProviders } from './location.providers';
import { LocationIsExistMiddleware } from '../middlewares/location.IsExist.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [LocationController],
  providers: [LocationService, ...locationProviders],
})
export class LocationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocationIsExistMiddleware)
      .forRoutes(
        { path: 'location/:id', method: RequestMethod.PUT },
        { path: 'location/:id', method: RequestMethod.DELETE },
      );
  }
}
