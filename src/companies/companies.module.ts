import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {CompaniesService} from './companies.service';
import {CompaniesController} from './companies.controller';
import {DatabaseModule} from '../core/database.module';
import {companyProviders} from './company.providers';
import {CompanyIsExistMiddleware} from './middlewares/company.isExist.middleware';

@Module({
  imports: [DatabaseModule],
  providers: [ ...companyProviders, CompaniesService],
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
