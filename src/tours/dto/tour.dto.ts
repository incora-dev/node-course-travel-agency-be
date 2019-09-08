import {IsEnum, IsNotEmpty, IsNumber, IsString, IsDate, MinDate, Min, IsOptional} from 'class-validator';
import {RoomType} from '../enums/roomType.enum';
import {ApiModelProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';

export class CreateTourDto {

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly price: number;

    @IsEnum(RoomType)
    @IsNotEmpty()
    @ApiModelProperty({ enum: ['ECONOM', 'LUX', 'STANDARD']})
    readonly roomType: RoomType;

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
}

export class UpdateTourDto {

    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiModelProperty()
    readonly price: number;

    @IsEnum(RoomType)
    @IsOptional()
    @ApiModelProperty({ enum: ['ECONOM', 'LUX', 'STANDARD']})
    readonly roomType: RoomType;

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
