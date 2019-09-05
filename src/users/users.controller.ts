import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'List of Users' })
    async getAll(): Promise<IUser[]> {
        return await this.usersService.getAllFromDB();
    }
}
