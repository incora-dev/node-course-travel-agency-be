import {IsNotEmpty, IsNumber, IsString, Min} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class ServiceDto {

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly service: string;
}
