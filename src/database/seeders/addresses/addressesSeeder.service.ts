import {Inject, Injectable} from '@nestjs/common';
import { AddressesSeeds } from './data';
import { Repository } from 'typeorm';
import {Address} from '../../../address/address.entity';
import {IAddress} from '../../../address/interface/address.interface';
import {AddressDTO} from '../../../address/dto/address.dto';

@Injectable()
export class AddressesSeederService {
    constructor(
        @Inject('ADDRESS_REPOSITORY')
        private readonly addressRepository: Repository<Address>,
    ) { }

    create(): Array<Promise<IAddress>> {
        return AddressesSeeds.map(async (address: AddressDTO) => {
            const addressExist = await this.addressRepository.findOne(address);
            if (addressExist) {
                return null;
            }
            return await this.addressRepository.save(address);
        });
    }
}
