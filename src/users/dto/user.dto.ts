import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly firstName: string;

    @IsString()
    @ApiModelProperty()
    readonly lastName?: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly email: string;

}
