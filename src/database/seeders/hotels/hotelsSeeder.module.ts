import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../../core/database.module';
import {companyProviders} from '../../../companies/company.providers';
import {addressProviders} from '../../../address/address.providers';
import {hotelProviders} from '../../../hotel/hotel.providers';
import {HotelsSeederService} from './hotelsSeeder.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...companyProviders,
        ...addressProviders,
        ...hotelProviders,
        HotelsSeederService,
    ],
    exports: [HotelsSeederService],
})
export class HotelsSeederModule {}
