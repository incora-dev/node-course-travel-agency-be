import {IsNotEmpty, IsString, MinLength} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateServiceDto {

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly service: number;
}
