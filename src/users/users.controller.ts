import {Controller, Get, Param, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import {UsersService} from './users.service';
import {IUser} from './interfaces/user.interface';
import {ApiImplicitQuery, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'User Object'})
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    getOneById(@Param() params): Promise<IUser> {
        return this.usersService.getOneById(params.id);
    }
}
