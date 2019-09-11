import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {ToursService} from '../tours/tours.service';

@Injectable()
export class TourIsExistMiddleware implements NestMiddleware {
    constructor(private readonly toursService: ToursService) {}

    async use(req: Request, res: Response, next: Function) {
        const id = req.url.split('/').reverse()[0];
        const tour = await this.toursService.getOneByParams({id});
        if (!tour) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        next();
    }
}
