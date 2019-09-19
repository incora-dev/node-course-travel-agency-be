import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Tour} from './tour.entity';
import {ITour} from './interface/tour.interface';
import {CreateTourDto, UpdateTourDto} from './dto/tour.dto';
import {Service} from '../services/service.entity';
import {Hotel} from '../hotel/hotel.entity';

@Injectable()
export class ToursService {
    constructor(
        @Inject('TOUR_REPOSITORY')
        private readonly tourRepository: Repository<Tour>,
        @Inject('SERVICE_REPOSITORY')
        private readonly serviceRepository: Repository<Service>,
        @Inject('HOTEL_REPOSITORY')
        private readonly hotelRepository: Repository<Hotel>,
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

    async getAll(): Promise<ITour[]> {
        return await this.tourRepository.find({relations: ['rooms', 'services']});
    }

    async deleteById(id: number): Promise<ITour> {
        return await this.tourRepository.remove( await this.tourRepository.findOne(id));
    }

    async update(id: number, data: UpdateTourDto ): Promise<ITour> {
        return await this.tourRepository.save({ ...data, id: Number(id) });
    }
}
