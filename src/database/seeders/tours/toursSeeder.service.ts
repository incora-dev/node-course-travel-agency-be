import {Inject, Injectable} from '@nestjs/common';
import { ToursSeeds } from './data';
import { Repository } from 'typeorm';
import {Tour} from '../../../tours/tour.entity';
import {ITour} from '../../../tours/interface/tour.interface';
import {CreateTourDto} from '../../../tours/dto/tour.dto';
import {Service} from '../../../services/service.entity';
import {Hotel} from '../../../hotel/hotel.entity';
import {RoomType} from '../../../rooms/enums/roomType.enum';

@Injectable()
export class ToursSeederService {
    constructor(
        @Inject('TOUR_REPOSITORY')
        private readonly tourRepository: Repository<Tour>,
        @Inject('SERVICE_REPOSITORY')
        private readonly serviceRepository: Repository<Service>,
        @Inject('HOTEL_REPOSITORY')
        private readonly hotelRepository: Repository<Hotel>,
    ) { }

    async create(): Promise<ITour[]> {
        const hotels = await this.hotelRepository.find();
        const services = await this.serviceRepository.find();
        return Promise.all(ToursSeeds.map(async (tour: CreateTourDto, index) => {
            return await this.tourRepository.save(
                {
                    ...tour,
                    services,
                    rooms: [
                        {
                            price: 4500,
                            roomType: RoomType.ECONOM,
                        },
                        {
                            price: 12500,
                            roomType: RoomType.LUX,
                        },
                    ],
                    hotel: hotels[index],
                },
            );
        }));
    }
}
