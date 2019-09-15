import { Module } from '@nestjs/common';
import {DatabaseModule} from '../core/database.module';
import {serviceProviders} from './service.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...serviceProviders],
})
export class ServicesModule {}
