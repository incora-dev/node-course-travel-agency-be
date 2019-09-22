import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly email?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly firstName?: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly lastName?: string;
}

export class UpdatePasswordDTO{
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    password: string;
}

export class UserDTO {

    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly password: string;
}

export class UserLogin {

    @IsEmail()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @ApiModelProperty()
    readonly password: string;
}
