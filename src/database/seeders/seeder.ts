import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { UserSeederService } from './users/usersSeeder.service';
import {CompaniesSeederService} from './companies/companiesSeeder.service';
import {AddressesSeederService} from './addresses/addressesSeeder.service';
import {HotelsSeederService} from './hotels/hotelsSeeder.service';
import {ServicesSeederService} from './services/servicesSeeder.service';
import {ToursSeederService} from './tours/toursSeeder.service';

@Injectable()
export class Seeder {
    constructor(
        private readonly logger: Logger,
        private readonly userSeederService: UserSeederService,
        private readonly companiesSeederService: CompaniesSeederService,
        private readonly addressesSeederService: AddressesSeederService,
        private readonly hotelsSeederService: HotelsSeederService,
        private readonly servicesSeederService: ServicesSeederService,
        private readonly toursSeederService: ToursSeederService,
    ) {}

    async seed() {
        try {
            const usersCompleted = await this.users();
            const addressesCompleted = await this.addresses();
            const companiesCompleted = await this.companies();
            const hotelsCompleted = await this.hotels();
            const servicesCompleted = await this.services();
            const toursCompleted = await this.tours();

            this.logger.debug('Successful completed seeding...');

            return true;
        } catch (err) {
            this.logger.error('Failed seeding...', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async users() {
        try {
            const createdPatterns = await Promise.all(this.userSeederService.create());

            const createdPatternsNumb = createdPatterns.filter(
                nullValueOrCreatedUser => nullValueOrCreatedUser,
            ).length;

            this.logger.debug(`Created ${createdPatternsNumb} user`);
            return true;
        } catch (err) {
            this.logger.error('Failed seeding users...', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async addresses() {
        try {
            const createdPatterns = await Promise.all(this.addressesSeederService.create());

            const createdPatternsNumb = createdPatterns.filter(
                nullValueOrCreatedAddress => nullValueOrCreatedAddress,
            ).length;

            this.logger.debug(`Created ${createdPatternsNumb} address`);
            return true;
        } catch (err) {
            this.logger.error('Failed seeding address...', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async companies() {
        try {
            const createdPatterns = await this.companiesSeederService.create();

            const createdPatternsNumb = createdPatterns.filter(
                nullValueOrCreatedCompany => nullValueOrCreatedCompany,
            ).length;

            this.logger.debug(`Created ${createdPatternsNumb} company`);
            return true;
        } catch (err) {
            this.logger.error('Failed seeding company...', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async hotels() {
        try {
            const createdPatterns = await this.hotelsSeederService.create();

            const createdPatternsNumb = createdPatterns.filter(
                nullValueOrCreatedHotel => nullValueOrCreatedHotel,
            ).length;

            this.logger.debug(`Created ${createdPatternsNumb} hotel`);
            return true;
        } catch (err) {
            this.logger.error('Failed seeding hotel...', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async services() {
        try {
            const createdPatterns = await Promise.all(this.servicesSeederService.create());

            const createdPatternsNumb = createdPatterns.filter(
                nullValueOrCreatedService => nullValueOrCreatedService,
            ).length;

            this.logger.debug(`Created ${createdPatternsNumb} service`);
            return true;
        } catch (err) {
            this.logger.error('Failed seeding service...', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async tours() {
        try {
            const createdPatterns = await this.toursSeederService.create();

            const createdPatternsNumb = createdPatterns.filter(
                nullValueOrCreatedTour => nullValueOrCreatedTour,
            ).length;

            this.logger.debug(`Created ${createdPatternsNumb} tour`);
            return true;
        } catch (err) {
            this.logger.error('Failed seeding tour...', err.stack);
            throw new InternalServerErrorException();
        }
    }
}
