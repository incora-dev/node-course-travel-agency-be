import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Request, HttpException } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { IHotel } from './interfaces/hotel.interface';
import { HotelDTO, UpdateHotelDTO } from './dto/hotel.dto';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Company } from '../companies/company.entity';
import { getRepository } from 'typeorm';

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
        return await this.hotelService.getOneByParams({id});
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: '```Created ```' })
    @ApiResponse({ status: 403, description: '```Forbidden``` Hotel already exists' })
    @ApiResponse({ status: 404, description: '```Not found``` You should have a Company to create a hotel' })
    async create(@Request() req, @Body() hotel: HotelDTO): Promise<IHotel> {
        const UserId = req.user.userId;
        const isUserHaveCompany = await getRepository(Company)
            .createQueryBuilder('company')
            .select()
            .where('company.ownerId = :id', { id: Number(UserId) })
            .getRawOne();
        if(!isUserHaveCompany){
            throw new HttpException('Not found', 404);
        }
        return await this.hotelService.create(hotel, isUserHaveCompany.company_id);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: '```Ok``` Successfully updated' })
    @ApiResponse({ status: 404, description: '```Not found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    async update(@Param('id') id: number, @Body() hotel: UpdateHotelDTO): Promise<IHotel> {
        return await this.hotelService.update(id, hotel);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: '```Ok``` Successfully removed' })
    @ApiResponse({ status: 404, description: '```Not Found```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    async delete(@Param('id') id: number): Promise<IHotel> {
        return await this.hotelService.delete(id);
    }
}
