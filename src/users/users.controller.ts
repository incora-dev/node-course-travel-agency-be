import {Controller, Post, Get, Body, Param, Delete, Put, HttpException, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {RoleGuard} from '../auth/guards/role.guard';
import {UsersService} from './users.service';
import {UpdateUserDto} from './dto/user.dto';
import {IUser} from './interfaces/user.interface';
import {ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {UserDTO} from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'User Object ```deleted User()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    deleteUserById(@Param() params): Promise<IUser> {
        return this.usersService.deleteUserById(params.id);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List of Users' })
    async getAll(): Promise<IUser[]> {
        return await this.usersService.getAllFromDB();
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'User Object ```new User()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    updateUser(@Param() params, @Body() user: UpdateUserDto): Promise<IUser> {
        return this.usersService.updateUser(params.id, user);
    }

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
        return await this.usersService.addToDB(user);
    }
}
