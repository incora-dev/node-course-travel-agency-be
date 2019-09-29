import {Inject, Injectable} from '@nestjs/common';
import { HotelsSeeds } from './data';
import { Repository } from 'typeorm';
import {Company} from '../../../companies/company.entity';
import {Address} from '../../../address/address.entity';
import {Hotel} from '../../../hotel/hotel.entity';
import {IHotel} from '../../../hotel/interfaces/hotel.interface';
import {HotelDTO} from '../../../hotel/dto/hotel.dto';

@Injectable()
export class HotelsSeederService {
    constructor(
        @Inject('COMPANY_REPOSITORY')
        private readonly companyRepository: Repository<Company>,
        @Inject('HOTEL_REPOSITORY')
        private readonly hotelRepository: Repository<Hotel>,
        @Inject('ADDRESS_REPOSITORY')
        private readonly addressRepository: Repository<Address>,
    ) { }

    async create(): Promise<IHotel[]> {
        const companies = await this.companyRepository.find();
        const address = await this.addressRepository.find({skip: companies.length});
        return Promise.all(HotelsSeeds.map(async (hotel: HotelDTO, index) => {
            const hotelExist = await this.hotelRepository.findOne({ name: hotel.name });
            if (hotelExist) {
                return null;
            }
            const newHotel = {
                ...hotel,
                averageRating: '0',
                company: companies[index],
                address: address[index],
            };
            return await this.hotelRepository.save(newHotel);
        }));
    }
}
