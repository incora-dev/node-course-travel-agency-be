import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressDTO, UpdateAddressDTO } from './dto/address.dto';
import { IAddress } from './interface/address.interface';

@Injectable()
export class AddressService {
    constructor(@Inject('ADDRESS_REPOSITORY')
    private readonly addressRepository: Repository<Address>) {}

    async getAll(): Promise<Address[]> {
        return this.addressRepository.find({relations: ['location']});
    }

    async create(address: AddressDTO): Promise<IAddress> {
        const isAddressExist = await this.getOneByParams(
            { country: address.country,
              city: address.city,
              state: address.state,
              street: address.street,
              address1: address.address1 });
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

    async getOneByParams(params: object): Promise<Address> {
        return await this.addressRepository.findOne(params);
    }

    async validateAddressCorrectness(address): Promise<void> {
        if (address) {
            if (!address.id) {
                throw new HttpException('Address don`t have id', HttpStatus.BAD_REQUEST);
            } else {
                const newAddress = new Address();
                delete Object.assign(newAddress, address).id;
                await this.checkAddressIfExist(newAddress);
            }
        }
    }

    async checkAddressIfExist(address): Promise<void> {
        if (await this.addressRepository.findOne(address)) {
            throw new HttpException('Address already exists!', HttpStatus.CONFLICT);
        }
    }
}
