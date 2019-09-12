import {Body, Controller, Post, Get, Param, Delete, Put} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {ApiUseTags, ApiResponse, ApiImplicitParam} from '@nestjs/swagger';
import {IRoom} from './interfaces/room.interface';
import {CreateRoomDto, UpdateRoomDto} from './dto/room.dto';

@ApiUseTags('rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Room has been successfully created. ```new Room()```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```{ statusCode: 400, message: "Bad request" }```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Tour not found" }```' })
    async create(@Body() room: CreateRoomDto): Promise<IRoom> {
        return await this.roomsService.createRoom(room);
    }

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

    @Put(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Room has been successfully updated ```updated Room()```' })
    @ApiResponse({ status: 400, description: 'Error Exception ```{ statusCode: 400, message: "Bad request" }```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    update(@Param() params, @Body() tour: UpdateRoomDto): Promise<IRoom> {
        return this.roomsService.update(params.id, tour);
    }
}
