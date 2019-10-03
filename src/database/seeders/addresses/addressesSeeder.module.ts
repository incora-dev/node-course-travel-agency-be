import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../../core/database.module';
import {addressProviders} from '../../../address/address.providers';
import {AddressesSeederService} from './addressesSeeder.service';

@Module({
    imports: [DatabaseModule],
    providers: [...addressProviders, AddressesSeederService],
    exports: [AddressesSeederService],
})
export class AddressesSeederModule {}
