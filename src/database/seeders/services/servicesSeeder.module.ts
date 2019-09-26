import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../../core/database.module';
import {serviceProviders} from '../../../services/service.providers';
import {ServicesSeederService} from './servicesSeeder.service';

@Module({
    imports: [DatabaseModule],
    providers: [...serviceProviders, ServicesSeederService],
    exports: [ServicesSeederService],
})
export class ServicesSeederModule {}
