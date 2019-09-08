import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, MinLength, IsOptional} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class UpdateUserDto {

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly email?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly firstName?: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly lastName?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiModelProperty()
    password?: string;
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

    @IsNotEmpty()
    @ApiModelProperty({ enum: ['ADMIN', 'USER'] })
    readonly role: UserRole;
}

export class UserLogin {

    @IsEmail()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @ApiModelProperty()
    readonly password: string;
}
