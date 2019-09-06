import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { ApiResponse } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

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
