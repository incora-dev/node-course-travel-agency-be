import {IsEmail, IsNotEmpty, IsString, MinLength, IsOptional} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateCompanyDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly contactEmail: string;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly name: string;

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly city: string;

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly state: string;

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly address1: string;

    @IsString()
    @IsOptional()
    @ApiModelProperty()
    readonly address2?: string;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly zip: string;

}
