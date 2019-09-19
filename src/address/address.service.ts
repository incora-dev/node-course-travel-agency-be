import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressDTO, UpdateAddressDTO } from './dto/address.dto';
import { IAddress } from './interface/address.interface';

@Injectable()
export class AddressService {
    constructor(@Inject('ADDRESS_REPOSITORY')
    private readonly addressRepository: Repository<Address>) {}

    async getAll(): Promise<Address[]> {
        return this.addressRepository.find();
    }

    async create(address: AddressDTO): Promise<IAddress> {
        const isAddressExist = await this.getOneByParams(
            { country: address.country,
              city: address.city,
              state: address.state,
              street: address.street });
        if (isAddressExist) {
            throw new HttpException('Address exists!', 403);
        }
        return await this.addressRepository.save(address);
    }

    async update(id: number, data: UpdateAddressDTO): Promise<IAddress> {
        return await this.addressRepository.save({ ...data, id: Number(id) });
    }

    async delete(id: number): Promise<IAddress> {
        const toRemove = await this.addressRepository.findOne(id);
        return this.addressRepository.remove(toRemove);
    }

    async getOneByParams(params: object): Promise<IAddress> {
        return await this.addressRepository.findOne(params);
    }
}
