import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import {Room} from './room.entity';
import {Repository} from 'typeorm';
import {Tour} from '../tours/tour.entity';
import {IRoom} from './interfaces/room.interface';

@Injectable()
export class RoomsService {
    constructor(
        @Inject('ROOM_REPOSITORY')
        private readonly roomRepository: Repository<Room>,
        @Inject('TOUR_REPOSITORY')
        private readonly tourRepository: Repository<Tour>,
    ) {}

    async getAll(): Promise<IRoom[]> {
        return await this.roomRepository.find();
    }

    async getOneByParams(params: object): Promise<IRoom> {
        return await this.roomRepository.findOne(params);
    }

    async deleteById(id: number): Promise<IRoom> {
        return await this.roomRepository.remove( await this.roomRepository.findOne(id));
    }
}
