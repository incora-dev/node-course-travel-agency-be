import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Tour} from './tour.entity';
import {ITour} from './interface/tour.interface';
import {CreateTourDto, UpdateTourDto} from './dto/tour.dto';
import {Service} from '../services/service.entity';
import {Hotel} from '../hotel/hotel.entity';
import {Room} from '../rooms/room.entity';

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

    async createTour(tour: CreateTourDto, userId: number): Promise<ITour> {
        const hotel = await this.hotelRepository.findOne(tour.hotelId, {relations: [ 'company' ]});
        if (!hotel) {
            throw new HttpException('Hotel not found', HttpStatus.NOT_FOUND);
        } else if (hotel.company.ownerId !== userId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        if (tour.services.length < 1 || tour.rooms.length < 1) {
            throw new HttpException('Services and Rooms array can`t be empty', HttpStatus.BAD_REQUEST);
        } else {
            tour.services.forEach((service) => {
                if ( !service.id || service.id === 0) {
                    throw new HttpException('Service id can`t be null', HttpStatus.BAD_REQUEST);
                }
            });
        }
        return await this.tourRepository.save(tour);
    }

    async getAll(page: number, limit: number): Promise<Object> {
        const tours = await this.tourRepository.findAndCount({skip: limit * ( page - 1 ), take: limit});
        return {
            items: tours[0],
            itemsCount: tours[0].length,
            page: Number(page),
            maxPage: Math.ceil(tours[1] / limit),
        };
    }

    async deleteById(id: number, userId: number): Promise<ITour> {
        const tour = await this.tourRepository.findOne(id);
        const hotel = await this.hotelRepository.findOne( tour.hotelId, {relations: [ 'company' ]});
        if (hotel.company.ownerId !== userId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return await this.tourRepository.remove(tour);
    }

    async update(id: number, data: UpdateTourDto, userId: number): Promise<ITour> {
        const tour = await this.tourRepository.findOne(id);
        const hotel = await this.hotelRepository.findOne(tour.hotelId, {relations: [ 'company' ]});
        if (hotel.company.ownerId !== userId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } else if ((data.services && data.services.length < 1) || (data.rooms && data.rooms.length < 1)) {
            throw new HttpException('Services and Rooms array can`t be empty', HttpStatus.BAD_REQUEST);
        }
        const result = await this.tourRepository.save({ ...data, id: Number(id) });
        await this.roomRepository.remove( await this.roomRepository.find({where: {tourId: null}}));
        return result;
    }
}
