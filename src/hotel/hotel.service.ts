import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Repository, getRepository, getConnection } from 'typeorm';
import { Hotel } from './hotel.entity';
import { IHotel } from './interfaces/hotel.interface';
import { HotelDTO, UpdateHotelDTO } from './dto/hotel.dto';
import { Address } from '../address/address.entity';
import { Location } from '../location/location.entity';

@Injectable()
export class HotelService {
    constructor(@Inject('HOTEL_REPOSITORY')
        private readonly hotelRepository: Repository<Hotel>,
    ) {}

    async getAll(): Promise<IHotel[]> {
        return await this.hotelRepository.find();
    }

    async getOneByParams(params: object): Promise<Hotel> {
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
        const hotelToUpdate = await this.getOneByParams({ id: Number(id) });
        const location = await getRepository(Address)
            .createQueryBuilder('address')
            .select('address.locationId')
            .where('address.id = :id', { id: hotelToUpdate.addressId })
            .getRawOne();

        hotel.address.id = hotelToUpdate.addressId;
        hotel.address.location.id = location.address_locationId;
        return await this.hotelRepository.save({ ...hotel, id: Number(id) });
    }
    async delete(id: number): Promise<IHotel> {
        const hotelToDel = await this.getOneByParams({ id: Number(id) });
        const hotelToRemove = await this.hotelRepository.findOne(id);
        const temp = await this.hotelRepository.remove(hotelToRemove);

        const location = await getRepository(Address)
            .createQueryBuilder('address')
            .select('address.locationId')
            .where('address.id = :id', { id: hotelToDel.addressId })
            .getRawOne();

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Address)
            .where('id = :id', { id: Number(hotelToDel.addressId) })
            .execute();

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Location)
            .where('id = :id', { id: Number(location.address_locationId) })
            .execute();

        return temp;
    }

}
