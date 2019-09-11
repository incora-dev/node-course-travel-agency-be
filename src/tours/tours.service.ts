import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Tour} from './tour.entity';
import {ITour} from './interface/tour.interface';
import {CreateTourDto, UpdateTourDto} from './dto/tour.dto';

@Injectable()
export class ToursService {
    constructor(
        @Inject('TOUR_REPOSITORY')
        private readonly tourRepository: Repository<Tour>,
    ) {}

    async getOneByParams(params: object): Promise<ITour> {
        return await this.tourRepository.findOne(params);
    }

    async createTour(tour: CreateTourDto): Promise<ITour> {
        return await this.tourRepository.save(tour);
    }

    async getAll(): Promise<ITour[]> {
        return await this.tourRepository.find();
    }

    async deleteById(id: number): Promise<ITour> {
        return await this.tourRepository.remove( await this.tourRepository.findOne(id));
    }

    async update(id: number, data: UpdateTourDto ): Promise<ITour> {
        return await this.tourRepository.save({ ...data, id: Number(id) });
    }
}
