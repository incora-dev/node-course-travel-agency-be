import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../../core/database.module';
import {tourProviders} from '../../../tours/tour.providers';
import {serviceProviders} from '../../../services/service.providers';
import {ToursSeederService} from './toursSeeder.service';
import {hotelProviders} from '../../../hotel/hotel.providers';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...tourProviders,
        ...serviceProviders,
        ...hotelProviders,
        ToursSeederService],
    exports: [ToursSeederService],
})
export class ToursSeederModule {}
