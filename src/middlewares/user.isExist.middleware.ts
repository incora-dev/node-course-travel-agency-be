import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import { Request, Response } from 'express';
import {UsersService} from '../users/users.service';

@Injectable()
export class UserIsExistMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {}

    async use(req: Request, res: Response, next: Function) {
        const id = req.url.split('/').reverse()[0];
        const user = await this.usersService.getOneByParams({ id });
        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        next();
    }
}
