import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Tour} from './tour.entity';
import {ITour} from './interface/tour.interface';
import {CreateTourDto, UpdateTourDto} from './dto/tour.dto';
import {Service} from '../services/service.entity';
import {Hotel} from '../hotel/hotel.entity';
import {Room} from '../rooms/room.entity';
import {responseConstants} from '../constants/responseConstants';
import {IService} from '../services/interfaces/service.interface';

@Injectable()
export class ToursService {
    constructor(
        @Inject('TOUR_REPOSITORY')
        private readonly tourRepository: Repository<Tour>,
        @Inject('SERVICE_REPOSITORY')
        private readonly serviceRepository: Repository<Service>,
        @Inject('HOTEL_REPOSITORY')
        private readonly hotelRepository: Repository<Hotel>,
        @Inject('ROOM_REPOSITORY')
        private readonly roomRepository: Repository<Room>,
    ) {}

    async getOneByParams(params: object): Promise<ITour> {
        return await this.tourRepository.findOne(params, {relations: ['rooms', 'services']});
    }

    async createTour(tour: CreateTourDto): Promise<ITour> {
        return await this.tourRepository.save(tour);
    }

    async getAll(page: number, limit: number): Promise<Object> {
        const tours = await this.tourRepository.findAndCount({
            skip: limit * page,
            take: limit,
            relations: ['rooms', 'services', 'hotel', 'hotel.address', 'hotel.images'],
        });
        return {
            items: tours[0],
            itemsCount: tours[0].length,
            total: tours[1],
            page: Number(page),
            maxPage: Math.ceil(tours[1] / limit) - 1,
        };
    }

    async deleteById(id: number): Promise<ITour> {
        return await this.tourRepository.remove( await this.tourRepository.findOne(id));
    }

    async update(id: number, data: UpdateTourDto): Promise<ITour> {
        const result = await this.tourRepository.save({ ...data, id: Number(id) });
        await this.roomRepository.remove( await this.roomRepository.find({where: {tourId: null}}));
        return result;
    }

    async checkByOwner(tourId: number, userId: number): Promise<void> {
        const tour = await this.tourRepository.findOne(tourId);
        const hotel = await this.hotelRepository.findOne(tour.hotelId, {relations: [ 'company' ]});
        if (hotel.company.ownerId !== userId) { throw new HttpException( responseConstants.forbidden, HttpStatus.FORBIDDEN); }
    }

    async checkServiceAndRoomArrays(data) {
        if ((data.services && data.services.length < 1) || (data.rooms && data.rooms.length < 1)) {
            throw new HttpException( responseConstants.arrayServiceOrRoomEmpty, HttpStatus.BAD_REQUEST);
        }
    }

    async checkServicesById(services: IService[]) {
        if (services) {
            services.forEach((service) => {
                if ( !service.id || service.id === 0) {
                    throw new HttpException( responseConstants.serviceIdCantBeNull, HttpStatus.BAD_REQUEST);
                }
            });
        }
    }

    async checkHotelToCreateTour(hotelId: number, userId: number) {
        const hotel = await this.hotelRepository.findOne(hotelId, {relations: [ 'company' ]});
        if (!hotel) {
            throw new HttpException(responseConstants.hotelNotFound, HttpStatus.NOT_FOUND);
        } else if (hotel.company.ownerId !== userId) {
            throw new HttpException( responseConstants.forbidden, HttpStatus.FORBIDDEN);
        }
    }
}
