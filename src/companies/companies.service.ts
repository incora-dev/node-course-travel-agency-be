import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Company} from './company.entity';
import {ICompany} from './interface/company.interface';
import {UpdateCompanyDto} from './dto/company.dto';
import {Address} from '../address/address.entity';
import {responseConstants} from '../constants/responseConstants';

@Injectable()
export class CompaniesService {
    constructor(
        @Inject('COMPANY_REPOSITORY')
        private readonly companyRepository: Repository<Company>,
        @Inject('ADDRESS_REPOSITORY')
        private readonly addressRepository: Repository<Address>,
    ) { }

    async createCompany(company: ICompany): Promise<ICompany> {
        return await this.companyRepository.save(company);
    }

    async getOneByParams(params: object): Promise<ICompany> {
        return await this.companyRepository.findOne(params, {relations: ['address']});
    }

    async getAll(): Promise<ICompany[]> {
        return await this.companyRepository.find({relations: ['address']});
    }

    async deleteCompanyById(id: number): Promise<ICompany> {
        const companyToDelete = await this.companyRepository.findOne(id, {relations: ['address']});
        await this.addressRepository.remove(companyToDelete.address);
        return companyToDelete;
    }

    async updateCompany(id: number, data: UpdateCompanyDto ): Promise<ICompany> {
        return await this.companyRepository.save({ ...data, id: Number(id) });
    }

    async checkCompanyByOwner(companyId, ownerId): Promise<void> {
        const company = await this.companyRepository.findOne({ id: Number(companyId) });
        if ( company.ownerId !== ownerId ) { throw new HttpException(responseConstants.forbidden, HttpStatus.FORBIDDEN); }
    }

    async checkCompanyByEmail(contactEmail, companyId = null): Promise<void> {
        const company = await this.companyRepository.findOne({ where: {contactEmail}});
        if ( company ) {
            if (company.id !== Number(companyId)) {
                throw new HttpException(responseConstants.companyAlreadyExist, HttpStatus.CONFLICT);
            }
        }
    }

    async checkIfUserHaveCompany(userId): Promise<void> {
        const company = await this.companyRepository.findOne({ where: {ownerId: userId}});
        if ( company ) { throw new HttpException(responseConstants.ownerMustHaveOneCompany, HttpStatus.CONFLICT); }
    }
}
