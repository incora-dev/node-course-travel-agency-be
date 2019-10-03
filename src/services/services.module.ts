import { Module } from '@nestjs/common';
import {DatabaseModule} from '../core/database.module';
import {serviceProviders} from './service.providers';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...serviceProviders, ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}
