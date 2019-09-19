import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDTO, UpdateLocationDTO } from './dto/location.dto';
import { ILocation } from './interface/location.interface';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('location')
@Controller('location')
export class LocationController {
    constructor( private readonly locationService: LocationService) {}

    @Post()
    async create(@Body() location: LocationDTO): Promise<ILocation> {
        return await this.locationService.create(location);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UpdateLocationDTO): Promise<ILocation> {
        return await this.locationService.update(id, data);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: '```Ok``` Successfully removed' })
    async delete(@Param('id') id: number): Promise<ILocation> {
        return await this.locationService.delete(id);
    }
}
