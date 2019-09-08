import {Controller, Get, Param, Post, Body} from '@nestjs/common';
import {ApiUseTags, ApiImplicitParam, ApiResponse} from '@nestjs/swagger';
import {ToursService} from './tours.service';
import {ITour} from './interface/tour.interface';
import {CreateTourDto} from './dto/tour.dto';

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
    async create(@Body() tour: CreateTourDto): Promise<ITour> {
        return await this.toursService.createTour(tour);
    }
}
