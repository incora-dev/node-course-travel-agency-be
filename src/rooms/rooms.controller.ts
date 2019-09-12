import {Body, Controller, Post} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {ApiUseTags, ApiResponse} from '@nestjs/swagger';
import {IRoom} from './interfaces/room.interface';
import {CreateRoomDto} from './dto/room.dto';

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
}
