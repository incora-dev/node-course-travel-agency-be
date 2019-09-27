import {Controller, Post, Get, Body, Param, Delete, Put, HttpException, UseGuards, HttpStatus, Request} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from './users.service';
import {IUser} from './interfaces/user.interface';
import {ApiResponse, ApiImplicitParam, ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import { UpdateUserDTO, UpdatePasswordDTO } from './dto/user.dto';
import {CompaniesService} from '../companies/companies.service';
import {ICompany} from '../companies/interface/company.interface';
import { responseConstants } from '../constants/responseConstants';
import { AuthService } from '../auth/auth.service';
import { TokenGuard } from '../auth/guards/token.guard';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly companiesService: CompaniesService,
        private readonly authService: AuthService
    ) { }

    @Delete()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), TokenGuard)
    @ApiResponse({ status: 200, description: '```Ok``` Successfully removed' })
    @ApiResponse({ status: 404, description: '```Not Found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @ApiResponse({ status: 403, description: '```Forbidden```' })
    async deleteUserById(@Request() req): Promise<Object> {
        const res = await this.usersService.deleteUserById(Number(req.user.userId));
        if (res) {
            const header = await this.authService.extractToken(req);
            await this.authService.logout(header);
            return {
                statusCode: 200,
                message: responseConstants.deleteSuccess,
            };
        }
    }

    @Get()
    @ApiResponse({ status: 200, description: '```Ok``` List of Users' })
    async getAll(): Promise<IUser[]> {
        return await this.usersService.getAllFromDB();
    }

    @Put()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), TokenGuard)
    @ApiResponse({ status: 200, description: '```Ok``` Successfully updated' })
    @ApiResponse({ status: 404, description: '```Not found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @ApiResponse({ status: 400, description: '```Bad Request```' })
    @ApiResponse({ status: 403, description: '```Forbidden```' })
    async updateUser(@Request() req, @Body() user: UpdateUserDTO): Promise<Object> {
        const res = await this.usersService.updateUser(Number(req.user.userId), user);
        if (res) {
            const header = await this.authService.extractToken(req);
            await this.authService.logout(header);
            return {
                statusCode: 200,
                message: responseConstants.updateSuccess,
            };
        }
    }

    @Put('password')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), TokenGuard)
    @ApiResponse({ status: 200, description: '```Ok``` Successfully updated' })
    @ApiResponse({ status: 404, description: '```Not found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @ApiResponse({ status: 403, description: '```Forbidden```' })
    async updatePassword(@Request() req, @Body() password: UpdatePasswordDTO): Promise<Object> {
        const res = await this.usersService.updatePassword(Number(req.user.userId), password);
        if (res) {
            const header = await this.authService.extractToken(req);
            await this.authService.logout(header);
            return {
                statusCode: 200,
                message: responseConstants.updateSuccess,
            };
        }
    }

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: '```Ok```'})
    @ApiResponse({ status: 404, description: '```Not found```' })
    async getOneById(@Param('id') id: number): Promise<IUser> {
        return await this.usersService.getOneByParams({ id });
    }

    @Get(':id/company')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Company Object'})
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    async getOneCompanyByUserId(@Param('id') id: number): Promise<ICompany> {
        const company = await this.companiesService.getOneByParams({ ownerId: id });
        if (!company) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return company;
    }
}
