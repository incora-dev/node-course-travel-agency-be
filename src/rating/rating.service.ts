import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { Rating } from './rating.entity';
import { IRating } from './interface/rating.interface';
import { CreateRatingDTO } from './dto/rating.dto';
import { Hotel } from '../hotel/hotel.entity';

@Injectable()
export class RatingService {
    constructor(@Inject('RATING_REPOSITORY')
    private readonly ratingRepository: Repository<Rating>) {}

    async addPoint(point: CreateRatingDTO, hotelId: number, userId: number): Promise<IRating> {
        const isHotelExist = await getRepository(Hotel)
            .createQueryBuilder('hotel')
            .where('hotel.id = :id', { id: hotelId})
            .getOne();
        if (!isHotelExist) {
            throw new HttpException('Hotel not found!', 404);
        }
        const checkForPoints = await this.ratingRepository.findOne({ hotelId: Number(hotelId), userId: Number(userId)});
        if (checkForPoints) {
            throw new HttpException('You can\'t leave rating twice', 403);
        }
        return await this.ratingRepository.save({...point, hotelId: Number(hotelId), userId: Number(userId)});
    }

    async getAverage(hotelId: number): Promise<number> {
        const { sum } = await getRepository(Rating)
            .createQueryBuilder('rating')
            .addSelect('rating.rating')
            .select('SUM(rating.rating)', 'sum')
            .where('rating.hotelId = :id', {id: hotelId})
            .getRawOne();
        const { count } = await getRepository(Rating)
            .createQueryBuilder('rating')
            .select('COUNT(rating.id)', 'count')
            .where('rating.hotelId = :id', { id: hotelId })
            .getRawOne();

        const res = sum / count;
        return Number(res.toFixed(1));
    }
}
