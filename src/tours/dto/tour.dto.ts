import {IsNotEmpty, IsNumber, IsString, IsDate, MinDate, Min, IsOptional, IsArray} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {Room} from '../../rooms/room.entity';
import {CreateRoomDto} from '../../rooms/dto/room.dto';
import {Service} from '../../services/service.entity';
import {ServiceDto} from '../../services/dto/service.dto';

export class CreateTourDto {

    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    @IsNotEmpty()
    @ApiModelProperty()
    readonly startDate: Date;

    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    @IsNotEmpty()
    @ApiModelProperty()
    readonly endDate: Date;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly description: string;

    @Type(() => Room)
    @IsArray()
    @IsNotEmpty()
    @ApiModelProperty({type: [CreateRoomDto]})
    readonly rooms: Room[];

    @Type(() => Service)
    @IsArray()
    @IsNotEmpty()
    @ApiModelProperty({type: [ServiceDto]})
    readonly services: Service[];

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly hotelId: number;
}

export class UpdateTourDto {

    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    @IsOptional()
    @ApiModelProperty()
    readonly startDate: Date;

    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    @IsOptional()
    @ApiModelProperty()
    readonly endDate: Date;

    @IsString()
    @IsOptional()
    @ApiModelProperty()
    readonly description: string;
}
