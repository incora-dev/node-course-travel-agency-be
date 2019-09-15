import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { DatabaseModule } from '../core/database.module';
import { addressProviders } from './address.providers';
import { AddressIsExistMiddleware } from '../middlewares/address.IsExist.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [AddressService, ...addressProviders],
})
export class AddressModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AddressIsExistMiddleware)
      .forRoutes(
        { path: 'address/:id', method: RequestMethod.PUT },
        { path: 'address/:id', method: RequestMethod.DELETE },
      );
  }
}
