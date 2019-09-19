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

    async createCompany(company: ICompany): Promise<ICompany> {
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
        const companyToDelete = await this.companyRepository.findOne(id, {relations: ['address1', 'address2']});
        await this.addressRepository.remove(companyToDelete.address1);
        if (companyToDelete.address2) {
            await this.addressRepository.remove( companyToDelete.address2);
        }
        return companyToDelete;
    }

    async updateCompany(id: number, data: UpdateCompanyDto ): Promise<ICompany> {
        const company = await this.getOneByParams({id: Number(id)});
        if (data.address1 === null) {
            throw new HttpException('First address can`t delete', HttpStatus.CONFLICT);
        }
        await this.validateAddressCorrectness(data.address1);
        if (data.address2 === null) {
            await this.addressRepository.remove(company.address2);
        } else if (company.address2) {
            await this.validateAddressCorrectness(data.address2);
        }
        return await this.companyRepository.save({ ...data, id: Number(id) });
    }

    async validateAddressCorrectness(address): Promise<void> {
        if (address) {
            if (!address.id) {
                throw new HttpException('Address don`t have id', HttpStatus.BAD_REQUEST);
            } else {
                const newAddress = new Address();
                delete Object.assign(newAddress, address).id;
                if (await this.addressRepository.findOne(newAddress)) {
                    throw new HttpException('Address already exists, change address!', HttpStatus.CONFLICT);
                }
            }
        }
    }
}
