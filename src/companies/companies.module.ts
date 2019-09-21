import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {CompaniesService} from './companies.service';
import {CompaniesController} from './companies.controller';
import {DatabaseModule} from '../core/database.module';
import {companyProviders} from './company.providers';
import {CompanyIsExistMiddleware} from '../middlewares/company.isExist.middleware';
import {addressProviders} from '../address/address.providers';
import {AddressService} from '../address/address.service';

@Module({
  imports: [DatabaseModule],
  providers: [
      CompaniesService,
      AddressService,
      ...companyProviders,
      ...addressProviders,
  ],
  controllers: [CompaniesController],
})
export class CompaniesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(CompanyIsExistMiddleware)
        .forRoutes(
            {path: 'companies/:id', method: RequestMethod.GET},
            {path: 'companies/:id', method: RequestMethod.PUT},
            {path: 'companies/:id', method: RequestMethod.DELETE},
        );
  }
}
