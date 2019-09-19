import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocationService } from '../location/location.service';

@Injectable()
export class LocationIsExistMiddleware implements NestMiddleware {
    constructor(private readonly locationService: LocationService) { }

    async use(req: Request, res: Response, next: Function) {
        const id = req.url.split('/').reverse()[0];
        const location = await this.locationService.getOneByParams({ id });
        if (!location) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        next();
    }
}
