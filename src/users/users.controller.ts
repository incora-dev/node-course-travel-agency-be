import {Body, Controller, Param, Put} from '@nestjs/common';
import {UsersService} from './users.service';
import {UpdateUserDto} from './dto/user.dto';
import {ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {IUser} from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'User Object ```new User()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    updateUser(@Param() params, @Body() user: UpdateUserDto): Promise<IUser> {
        return this.usersService.updateUser(params.id, user);
    }
}
