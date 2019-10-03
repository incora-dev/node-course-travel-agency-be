import { Module } from '@nestjs/common';
import {DatabaseModule} from '../../../core/database.module';
import {companyProviders} from '../../../companies/company.providers';
import {CompaniesSeederService} from './companiesSeeder.service';
import {addressProviders} from '../../../address/address.providers';
import {userProviders} from '../../../users/user.providers';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...companyProviders,
        ...addressProviders,
        ...userProviders,
        CompaniesSeederService],
    exports: [CompaniesSeederService],
})
export class CompaniesSeederModule {}
