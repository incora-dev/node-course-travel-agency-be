import {Controller, Post, Get, Body, Param, Delete, Put, HttpException, UseGuards, HttpStatus} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {RoleGuard} from '../auth/guards/role.guard';
import {UsersService} from './users.service';
import {IUser} from './interfaces/user.interface';
import {ApiResponse, ApiImplicitParam, ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import {UserDTO, UpdateUserDTO} from './dto/user.dto';
import {CompaniesService} from '../companies/companies.service';
import {ICompany} from '../companies/interface/company.interface';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly companiesService: CompaniesService,
    ) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt')/*, RoleGuard*/)
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: '```Ok``` Successfully removed' })
    @ApiResponse({ status: 404, description: '```Not Found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @Delete(':id')
    async deleteUserById(@Param() params): Promise<IUser> {
        return await this.usersService.deleteUserById(params.id);
    }

    @Get()
    @ApiResponse({ status: 200, description: '```Ok``` List of Users' })
    async getAll(): Promise<IUser[]> {
        return await this.usersService.getAllFromDB();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: '```Ok``` Successfully updated' })
    @ApiResponse({ status: 404, description: '```Not found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @Put(':id')
    async updateUser(@Param() params, @Body() user: UpdateUserDTO): Promise<IUser> {
        return await this.usersService.updateUser(params.id, user);
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

    @Post()
    @ApiResponse({ status: 201, description: '```Created ```' })
    @ApiResponse({ status: 403, description: '```Forbidden``` User already exists' })
    async add(@Body() user: UserDTO): Promise<IUser> {
        return await this.usersService.addToDB(user);
    }
}
