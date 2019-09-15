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

    async createTour(tour: CreateTourDto): Promise<ITour> {
        const hotel = await this.hotelRepository.findOne(tour.hotelId);
        if (!hotel) {
            throw new HttpException('Hotel not found', HttpStatus.NOT_FOUND);
        }
        const services = await Promise.all(tour.services.map(async (serviceName) => {
            const service = await this.serviceRepository.findOne({service: serviceName});
            if (!service) {
                throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
            }
            return service;
        }));
        const newTour = new Tour();
        newTour.startDate = tour.startDate;
        newTour.endDate = tour.endDate;
        newTour.description = tour.description;
        newTour.services = services;
        newTour.rooms = tour.rooms;
        newTour.hotel = hotel;
        return await this.tourRepository.save(newTour);
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
