import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';
import { IHotel } from './interfaces/hotel.interface';
import { HotelDTO, UpdateHotelDTO } from './dto/hotel.dto';

@Injectable()
export class HotelService {
    constructor(@Inject('HOTEL_REPOSITORY')
        private readonly hotelRepository: Repository<Hotel>,
    ) {}

    async getAll(): Promise<IHotel[]> {
        return await this.hotelRepository.find();
    }

    async getOneByParams(params: object): Promise<IHotel> {
        return await this.hotelRepository.findOne(params);
    }

    async create(hotel: HotelDTO, companyId: number): Promise<IHotel> {
        const name = hotel.name;
        const hotelFromDB = await this.getOneByParams({name});
        if (hotelFromDB) {
            throw new HttpException('Hotel exists!', 400);
        }
        return await this.hotelRepository.save({...hotel, companyId: Number(companyId)});
    }
    async update(id: number, hotel: UpdateHotelDTO): Promise<IHotel> {
        return await this.hotelRepository.save({...hotel, id: Number(id)});
    }
    async delete(id: number): Promise<IHotel> {
        const userToRemove = await this.hotelRepository.findOne(id);
        return await this.hotelRepository.remove(userToRemove);
    }

}
