import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AddressService } from '../address/address.service';

@Injectable()
export class AddressIsExistMiddleware implements NestMiddleware {
    constructor(private readonly addressService: AddressService) { }

    async use(req: Request, res: Response, next: Function) {
        const id = req.url.split('/').reverse()[0];
        const address = await this.addressService.getOneByParams({ id });
        if (!address) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        next();
    }
}
