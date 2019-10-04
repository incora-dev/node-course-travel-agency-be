import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, getRepository, getConnection, Like } from 'typeorm';
import { Hotel } from './hotel.entity';
import { IHotel } from './interfaces/hotel.interface';
import { HotelDTO, UpdateHotelDTO } from './dto/hotel.dto';
import { Address } from '../address/address.entity';
import { Location } from '../location/location.entity';
import { Rating } from '../rating/rating.entity';
import { responseConstants } from '../constants/responseConstants';
import { Company } from '../companies/company.entity';

@Injectable()
export class HotelService {
    constructor(@Inject('HOTEL_REPOSITORY')
        private readonly hotelRepository: Repository<Hotel>,
    ) {}

    async getOneByParams(params: object): Promise<Hotel> {
        return await this.hotelRepository.findOne(params, {relations: ['images', 'company', 'address']});
    }

    async getAverage(hotelId: number): Promise<string> {
        const { sum } = await getRepository(Rating)
            .createQueryBuilder('rating')
            .addSelect('rating.rating')
            .select('SUM(rating.rating)', 'sum')
            .where('rating.hotelId = :id', { id: hotelId })
            .getRawOne();
        const { count } = await getRepository(Rating)
            .createQueryBuilder('rating')
            .select('COUNT(rating.id)', 'count')
            .where('rating.hotelId = :id', { id: hotelId })
            .getRawOne();

        let res = sum / count;
        if (isNaN(res)) {res = 0; }
        return String(res.toFixed(1));
    }
    async updateRating(id: number, averageRating: string): Promise<{ id: number, averageRating: string }> {
        return await this.hotelRepository.save({ id: Number(id), averageRating: String(averageRating) });
    }

    async create(hotel: HotelDTO, companyId: number): Promise<IHotel> {
        const name = hotel.name;
        const hotelFromDB = await this.getOneByParams({name});
        if (hotelFromDB) {
            throw new HttpException(responseConstants.hotelAlreadyExists, HttpStatus.CONFLICT);
        }
        return await this.hotelRepository.save({...hotel, averageRating: '0', companyId: Number(companyId)});
    }
    async update(id: number, hotel: UpdateHotelDTO): Promise<IHotel> {
        const hotelToUpdate = await this.getOneByParams({ id: Number(id) });
        if (hotel.address) {
            const location = await getRepository(Address)
                .createQueryBuilder('address')
                .select('address.locationId')
                .where('address.id = :id', { id: hotelToUpdate.addressId })
                .getRawOne();
            hotel.address.id = hotelToUpdate.addressId;
            if (hotel.address.location) { hotel.address.location.id = location.address_locationId; }
        }
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
    async checkForOwner(hotelId: number, userId: number): Promise<boolean> {
        const hotel = await this.getOneByParams({ id: Number(hotelId) });
        const ownerId = await getRepository(Company)
            .createQueryBuilder('company')
            .select('company.ownerId')
            .where('company.id = :id', { id: Number(hotel.companyId) })
            .getRawOne();

        if (userId !== Number(ownerId.company_ownerId)) {
            return false;
        }
        return true;
    }
    async search(target: string, page: number, limit: number): Promise<Object> {
        if (+(page && limit) !== 0) {
            const hotels = await this.hotelRepository.findAndCount(
                {
                    where: { name: Like('%' + target + '%') },
                    take: limit,
                    skip: limit * (page - 1),
                    relations: ['images', 'company', 'address'],
                },
            );

            for (const key of hotels[0]) {
                const id = key.id;
                const averageRating = await this.getAverage(id);
                await this.updateRating(id, averageRating);
                key.averageRating = averageRating;
            }
            return {
                items: hotels[0],
                itemsCount: hotels[0].length,
                total: hotels[1],
                page: Number(page),
                maxPage: Math.ceil(hotels[1] / limit),
            };
        }
        return await this.hotelRepository.find();
    }
}
