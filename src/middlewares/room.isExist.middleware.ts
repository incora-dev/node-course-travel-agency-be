import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {RoomsService} from '../rooms/rooms.service';

@Injectable()
export class RoomIsExistMiddleware implements NestMiddleware {
    constructor(private readonly roomsService: RoomsService) {}

    async use(req: Request, res: Response, next: Function) {
        const id = req.url.split('/').reverse()[0];
        const tour = await this.roomsService.getOneByParams({id});
        if (!tour) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        next();
    }
}
