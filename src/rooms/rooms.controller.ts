import {Body, Controller, Post, Get, Param, Delete, Put} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {ApiUseTags, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {IRoom} from './interfaces/room.interface';

@ApiUseTags('rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Success ```Rooms list```'})
    getAll(): Promise<IRoom[]> {
        return this.roomsService.getAll();
    }

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Ok ```Room Object```'})
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    getOneById(@Param('id') id: number): Promise<IRoom> {
        return this.roomsService.getOneByParams({ id });
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Room has been successfully deleted ```deleted Room()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    deleteById(@Param() params): Promise<IRoom> {
        return this.roomsService.deleteById(params.id);
    }
}
