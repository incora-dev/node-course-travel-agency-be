import { Module, Logger } from '@nestjs/common';
import { Seeder } from './seeder';
import { UserSeederModule } from './users/usersSeeder.module';
import {DatabaseModule} from '../../core/database.module';
import {CompaniesSeederModule} from './companies/companiesSeeder.module';
import {AddressesSeederModule} from './addresses/addressesSeeder.module';

@Module({
    imports: [
        DatabaseModule,
        UserSeederModule,
        CompaniesSeederModule,
        AddressesSeederModule,
    ],
    providers: [Logger, Seeder],
})
export class SeederModule {}
