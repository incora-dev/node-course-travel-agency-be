import {Controller, Post, Get, Body, Param, Delete, Put, HttpException, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {RoleGuard} from '../auth/guards/role.guard';
import {UsersService} from './users.service';
import {UpdateUserDto} from './dto/user.dto';
import {IUser} from './interfaces/user.interface';
import {ApiResponse, ApiImplicitParam, ApiBearerAuth} from '@nestjs/swagger';
import {UserDTO} from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: '```Ok``` Successfully removed' })
    @ApiResponse({ status: 404, description: '```Not Found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @Delete(':id')
    deleteUserById(@Param() params): Promise<IUser> {
        return this.usersService.deleteUserById(params.id);
    }

    @Get()
    @ApiResponse({ status: 200, description: '```Ok``` List of Users' })
    async getAll(): Promise<IUser[]> {
        return await this.usersService.getAllFromDB();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: '```Ok``` Successfully updated' })
    @ApiResponse({ status: 404, description: '```Not found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @Put(':id')
    updateUser(@Param() params, @Body() user: UpdateUserDto): Promise<IUser> {
        return this.usersService.updateUser(params.id, user);
    }

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: '```Ok```'})
    @ApiResponse({ status: 404, description: '```Not found```' })
    getOneById(@Param('id') id: number): Promise<IUser> {
        return this.usersService.getOneByParams({ id });
    }

    @Post()
    @ApiResponse({ status: 201, description: '```Created ```' })
    @ApiResponse({ status: 403, description: '```Forbidden``` User already exists' })
    async add(@Body() user: UserDTO): Promise<IUser> {
        return await this.usersService.addToDB(user);
    }
}
