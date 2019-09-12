import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import {DatabaseModule} from '../core/database.module';
import {serviceProviders} from './service.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ServicesService, ...serviceProviders],
  controllers: [ServicesController],
})
export class ServicesModule {}
