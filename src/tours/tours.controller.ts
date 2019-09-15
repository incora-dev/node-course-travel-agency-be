import {Controller, Get, Param, Post, Body, Delete, Put} from '@nestjs/common';
import {ApiUseTags, ApiImplicitParam, ApiResponse} from '@nestjs/swagger';
import {ToursService} from './tours.service';
import {ITour} from './interface/tour.interface';
import {CreateTourDto, UpdateTourDto} from './dto/tour.dto';

@ApiUseTags('tours')
@Controller('tours')
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Ok ```Tour Object```'})
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    getOneById(@Param('id') id: number): Promise<ITour> {
        return this.toursService.getOneByParams({ id });
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Tour has been successfully created. ```new Tour()```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```{ statusCode: 400, message: "Bad request" }```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Hotel not found" }```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Service not found" }```' })
    async create(@Body() tour: CreateTourDto): Promise<ITour> {
        return await this.toursService.createTour(tour);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Success ```List of Tours```'})
    getAll(): Promise<ITour[]> {
        return this.toursService.getAll();
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Tour has been successfully deleted ```deleted Tour()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    deleteById(@Param() params): Promise<ITour> {
        return this.toursService.deleteById(params.id);
    }

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Tour has been successfully updated ```updated Tour()```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```{ statusCode: 400, message: "Bad request" }```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    update(@Param() params, @Body() tour: UpdateTourDto): Promise<ITour> {
        return this.toursService.update(params.id, tour);
    }
}
