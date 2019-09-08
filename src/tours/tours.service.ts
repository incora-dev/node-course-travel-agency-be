import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Tour} from './tour.entity';
import {ITour} from './interface/tour.interface';

@Injectable()
export class ToursService {
    constructor(
        @Inject('TOUR_REPOSITORY')
        private readonly tourRepository: Repository<Tour>,
    ) {}

    async getOneByParams(params: object): Promise<ITour> {
        return await this.tourRepository.findOne(params);
    }
}
