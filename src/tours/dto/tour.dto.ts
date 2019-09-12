import {IsNotEmpty, IsNumber, IsString, IsDate, MinDate, Min, IsOptional, IsArray} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {Service} from '../../services/service.entity';

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

    @IsArray()
    @IsOptional()
    @ApiModelProperty()
    readonly services: Service[];
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
