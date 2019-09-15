import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Company} from './company.entity';
import {ICompany} from './interface/company.interface';
import {CreateCompanyDto, UpdateCompanyDto} from './dto/company.dto';
import {Address} from '../address/address.entity';

@Injectable()
export class CompaniesService {
    constructor(
        @Inject('COMPANY_REPOSITORY')
        private readonly companyRepository: Repository<Company>,
        @Inject('ADDRESS_REPOSITORY')
        private readonly addressRepository: Repository<Address>,
    ) { }

    async createCompany(company: CreateCompanyDto): Promise<ICompany> {
        const address1 = await this.addressRepository.findOne(company.address1);
        if (address1) {
            throw new HttpException('Address already exists!', HttpStatus.CONFLICT);
        }
        return await this.companyRepository.save(company);
    }

    async getOneByParams(params: object): Promise<ICompany> {
        return await this.companyRepository.findOne(params, {relations: ['address1', 'address2']});
    }

    async getAll(): Promise<ICompany[]> {
        return await this.companyRepository.find({relations: ['address1', 'address2']});
    }

    async deleteCompanyById(id: number): Promise<ICompany> {
        return await this.companyRepository.remove( await this.companyRepository.findOne(id));
    }

    async updateCompany(id: number, data: UpdateCompanyDto ): Promise<ICompany> {
        return await this.companyRepository.save({ ...data, id: Number(id) });
    }
}
