import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { hotelProviders } from './hotel.providers';
import { DatabaseModule } from '../core/database.module';
import { HotelIsExistMiddleware } from '../middlewares/hotel.isExist.middleware';

@Module({
  imports:[DatabaseModule],
  controllers: [HotelController],
  providers: [HotelService, ...hotelProviders]
})
export class HotelModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HotelIsExistMiddleware)
      .forRoutes(
        { path: 'hotel/:id', method: RequestMethod.GET },
        { path: 'hotel/:id', method: RequestMethod.PUT },
        { path: 'hotel/:id', method: RequestMethod.DELETE },
      );
  }
}
