import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Company} from './company.entity';
import {ICompany} from './interface/company.interface';
import {CreateCompanyDto} from './dto/company.dto';

@Injectable()
export class CompaniesService {
    constructor(
        @Inject('COMPANY_REPOSITORY')
        private readonly companyRepository: Repository<Company>,
    ) { }

    async createCompany(company: CreateCompanyDto): Promise<ICompany> {
        return await this.companyRepository.save(company);
    }

    async getOneByParams(params: object): Promise<ICompany> {
        return await this.companyRepository.findOne(params);
    }

    async getAll(): Promise<ICompany[]> {
        return await this.companyRepository.find();
    }

    async deleteCompanyById(id: number): Promise<ICompany> {
        return await this.companyRepository.remove( await this.companyRepository.findOne(id));
    }
}
