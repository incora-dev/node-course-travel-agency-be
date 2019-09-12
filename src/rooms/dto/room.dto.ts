import {IsEnum, IsNotEmpty, IsNumber, Min} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {RoomType} from '../enums/roomType.enum';

export class CreateRoomDto {

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly price: number;

    @IsEnum(RoomType)
    @IsNotEmpty()
    @ApiModelProperty({ enum: ['ECONOM', 'LUX', 'STANDARD']})
    readonly roomType: RoomType;
}
