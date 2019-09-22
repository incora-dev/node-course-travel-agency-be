import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { IHotel } from './interfaces/hotel.interface';
import { HotelDTO, UpdateHotelDTO } from './dto/hotel.dto';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Company } from '../companies/company.entity';
import { getRepository } from 'typeorm';
import { responseConstants } from '../constants/responseConstants';

@ApiUseTags('hotel')
@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService) {}

    @Get()
    @ApiResponse({ status: 200, description: '```Ok``` List of Hotels' })
    async getAll(): Promise<IHotel[]> {
        return await this.hotelService.getAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: '```Ok```' })
    @ApiResponse({ status: 404, description: '```Not found```' })
    async getOne(@Param('id') id: number): Promise<IHotel> {
        const averageRating = await this.hotelService.getAverage(id);
        await this.hotelService.updateRating(id, averageRating);
        return await this.hotelService.getOneByParams({ id });
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: '```Created ```' })
    @ApiResponse({ status: 403, description: '```Forbidden``` Hotel already exists' })
    @ApiResponse({ status: 404, description: '```Not found``` You should have a Company to create a hotel' })
    async create(@Request() req, @Body() hotel: HotelDTO): Promise<Object> {
        const isUserHaveCompany = await getRepository(Company)
            .createQueryBuilder('company')
            .select()
            .where('company.ownerId = :id', { id: Number(req.user.userId) })
            .getRawOne();
        if (!isUserHaveCompany) {
            throw new HttpException(responseConstants.companyNotFound, HttpStatus.NOT_FOUND);
        }
        const hotelFromDB = await this.hotelService.create(hotel, isUserHaveCompany.company_id);
        if (hotelFromDB) {
            return {
                statusCode: 201,
                message: responseConstants.createSuccess,
                hotelId: hotelFromDB.id,
            };
        }
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: '```Ok``` Successfully updated' })
    @ApiResponse({ status: 404, description: '```Not found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @ApiResponse({ status: 409, description: '```Conflict```' })
    async update(@Param('id') id: number, @Body() hotel: UpdateHotelDTO, @Request() req): Promise<Object> {
        await this.hotelService.checkForOwner(id, req.user.userId)
            .then(res => {
                if (!res) {
                    throw new HttpException(responseConstants.notOwnerOfHotel, HttpStatus.CONFLICT);
                }
            })
        const res = await this.hotelService.update(id, hotel);
        if (res) {
            return {
                statusCode: 200,
                message: responseConstants.updateSuccess,
            };
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: '```Ok``` Successfully removed' })
    @ApiResponse({ status: 404, description: '```Not Found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    @ApiResponse({ status: 409, description: '```Conflict```' })
    async delete(@Param('id') id: number, @Request() req): Promise<Object> {
        await this.hotelService.checkForOwner(id, req.user.userId)
        .then(res => {
            if(!res){
                throw new HttpException(responseConstants.notOwnerOfHotel, HttpStatus.CONFLICT);
            }
        })
        const res = await this.hotelService.delete(id);
        if (res) {
            return {
                statusCode: 200,
                message: responseConstants.deleteSuccess,
            };
        }
    }
}
