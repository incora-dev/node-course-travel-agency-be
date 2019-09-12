import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import {Room} from './room.entity';
import {Repository} from 'typeorm';
import {Tour} from '../tours/tour.entity';
import {CreateRoomDto} from './dto/room.dto';
import {IRoom} from './interfaces/room.interface';

@Injectable()
export class RoomsService {
    constructor(
        @Inject('ROOM_REPOSITORY')
        private readonly roomRepository: Repository<Room>,
        @Inject('TOUR_REPOSITORY')
        private readonly tourRepository: Repository<Tour>,
    ) {}

    async createRoom(room: CreateRoomDto): Promise<IRoom> {
        const tour = await this.tourRepository.findOne(room.tourId);
        if ( tour ) {
            const newRoom = new Room();
            newRoom.price = room.price;
            newRoom.roomType = room.roomType;
            newRoom.tour = tour;
            return await this.roomRepository.save(newRoom);
        }
        throw new HttpException('Tour not found', HttpStatus.NOT_FOUND);
    }
}
