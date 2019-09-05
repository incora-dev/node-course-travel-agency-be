import {Controller, Delete, Param} from '@nestjs/common';
import {UsersService} from './users.service';
import {IUser} from './interfaces/user.interface';
import {ApiImplicitParam, ApiResponse} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'User Object ```deleted User()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    deleteUserById(@Param() params): Promise<IUser> {
        return this.usersService.deleteUserById(params.id);
    }
}
