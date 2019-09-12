import {IsEnum, IsNotEmpty, IsNumber, IsOptional, Min} from 'class-validator';
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

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly tourId: number;
}

export class UpdateRoomDto {

    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiModelProperty()
    readonly price: number;

    @IsEnum(RoomType)
    @IsOptional()
    @ApiModelProperty({ enum: ['ECONOM', 'LUX', 'STANDARD']})
    readonly roomType: RoomType;
}
