import {Inject, Injectable} from '@nestjs/common';
import { CompaniesSeeds } from './data';
import { Repository } from 'typeorm';
import {Company} from '../../../companies/company.entity';
import {ICompany} from '../../../companies/interface/company.interface';
import {CreateCompanyDto} from '../../../companies/dto/company.dto';
import {Address} from '../../../address/address.entity';
import {User} from '../../../users/user.entity';

@Injectable()
export class CompaniesSeederService {
    constructor(
        @Inject('COMPANY_REPOSITORY')
        private readonly companyRepository: Repository<Company>,
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
        @Inject('ADDRESS_REPOSITORY')
        private readonly addressRepository: Repository<Address>,
    ) { }

    async create(): Promise<ICompany[]> {
        const owners = await this.userRepository.find();
        const address = await this.addressRepository.find();
        return Promise.all(CompaniesSeeds.map(async (company: CreateCompanyDto, index) => {
            const companyExist = await this.companyRepository.findOne({ contactEmail: company.contactEmail });
            if (companyExist) {
                return null;
            }
            const newCompany = {
                ...company,
                owner: owners[index],
                address: address[index],
            };
            return await this.companyRepository.save(newCompany);
        }));
    }
}
