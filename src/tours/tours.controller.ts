import {Controller, Get, Param, Post, Body, Delete, Put, UseGuards, Request, Query} from '@nestjs/common';
import {ApiUseTags, ApiImplicitParam, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import {ToursService} from './tours.service';
import {ITour} from './interface/tour.interface';
import {CreateTourDto, UpdateTourDto} from './dto/tour.dto';
import {AuthGuard} from '@nestjs/passport';
import {responseConstants} from '../constants/responseConstants';

@ApiUseTags('tours')
@Controller('tours')
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Success ```Tour Object```'})
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    getOneById(@Param('id') id: number): Promise<ITour> {
        return this.toursService.getOneByParams({ id });
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'Success ```{ statusCode: 201, message: "Create was successful, tourId: id"}```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```' +
            '{ statusCode: 400, message: "Bad request" }' +
            '{ statusCode: 400, message: "Services and Rooms array can`t be empty" }' +
            '{ statusCode: 400, message: "Service id can`t be null" }' +
            '```' })
    @ApiResponse({ status: 401, description: 'Error Exception ```{ statusCode: 401, message: "Unauthorized" }```' })
    @ApiResponse({ status: 403, description: 'Error Exception```{ statusCode: 403, message: "Forbidden"}```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Hotel not found" }```' })
    async create(@Body() tour: CreateTourDto,  @Request() req): Promise<Object> {
        await this.toursService.checkHotelToCreateTour(tour.hotelId, req.user.userId);
        await this.toursService.checkServiceAndRoomArrays(tour);
        await this.toursService.checkServicesById(tour.services);
        const newTour = await this.toursService.createTour(tour);
        if ( newTour ) {
            return {
                statusCode: 201,
                message: responseConstants.createSuccess,
                objectId: newTour.id,
            };
        }
    }

    @Get('')
    @ApiResponse({ status: 200, description: 'Success ```List of Tours```'})
    getAll(@Query('page') page: number = 0, @Query('limit') limit: number = 10): Promise<Object> {
        return this.toursService.getAll(page, limit);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Success ```{ statusCode: 200, message: "Delete was successful"}```' })
    @ApiResponse({ status: 401, description: 'Error Exception ```{ statusCode: 401, message: "Unauthorized" }```' })
    @ApiResponse({ status: 403, description: 'Error Exception```{ statusCode: 403, message: "Forbidden"}```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    async deleteById(@Param() params, @Request() req): Promise<Object> {
        await this.toursService.checkByOwner(params.id, req.user.userId);
        if ( this.toursService.deleteById(params.id)) {
            return {
                statusCode: 200,
                message: responseConstants.deleteSuccess,
            };
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Success ```{ statusCode: 200, message: "Update was successful"}```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```' +
            '{ statusCode: 400, message: "Bad request" }' +
            '{ statusCode: 400, message: "Services and Rooms array can`t be empty" }' +
            '```' })
    @ApiResponse({ status: 401, description: 'Error Exception ```{ statusCode: 401, message: "Unauthorized" }```' })
    @ApiResponse({ status: 403, description: 'Error Exception```{ statusCode: 403, message: "Forbidden"}```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    async update(@Param() params, @Body() tour: UpdateTourDto, @Request() req): Promise<Object> {
        await this.toursService.checkByOwner(params.id, req.user.userId);
        await this.toursService.checkServiceAndRoomArrays(tour);
        if ( this.toursService.update(params.id, tour) ) {
            return {
                statusCode: 200,
                message: responseConstants.updateSuccess,
            };
        }
    }
}
