import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HotelService } from '../hotel/hotel.service';

@Injectable()
export class HotelIsExistMiddleware implements NestMiddleware {
    constructor(private readonly hotelService: HotelService) { }

    async use(req: Request, res: Response, next: Function) {
        const id = req.url.split('/').reverse()[0];
        const hotel = await this.hotelService.getOneByParams({ id });
        if (!hotel) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        next();
    }
}