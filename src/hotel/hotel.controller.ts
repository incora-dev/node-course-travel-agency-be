import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { IHotel } from './interfaces/hotel.interface';
import { HotelDTO, UpdateHotelDTO } from './dto/hotel.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

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
    @ApiResponse({ status: 201, description: '```Created ```' })
    @ApiResponse({ status: 403, description: '```Forbidden``` Hotel already exists' })
    async create(@Body() hotel: HotelDTO): Promise<IHotel> {
        return await this.hotelService.create(hotel);
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
