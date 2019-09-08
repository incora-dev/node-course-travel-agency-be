import {IsEnum, IsNotEmpty, IsNumber, IsString, IsDate, MinDate, Min} from 'class-validator';
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
