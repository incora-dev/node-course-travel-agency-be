import {Controller, Post, Get, Body, Param, UseInterceptors, HttpException, ClassSerializerInterceptor} from '@nestjs/common';
import {UsersService} from './users.service';
import {IUser} from './interfaces/user.interface';
import {ApiImplicitQuery, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'User Object'})
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    getOneById(@Param('id') id: number): Promise<IUser> {
        return this.usersService.getOneByParams({ id });
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The User has been successfully added.' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 400, message: "User exists!" }```' })
    async add(@Body() user: UserDTO): Promise<IUser> {
        const email = user.email;
        const userFromDB = await this.usersService.getOneByParams({ email });
        if (userFromDB) {
            throw new HttpException('User exists!', 400);
        }
        return await this.usersService.addToDB(user);
    }
}
