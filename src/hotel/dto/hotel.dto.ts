import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class HotelDTO {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    name: string;

    @IsString()
    @ApiModelProperty()
    description: string;

    @IsPhoneNumber('ZZ')
    @ApiModelProperty()
    phone: string;
}

export class UpdateHotelDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    name?: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    description?: string;

    @IsOptional()
    @IsPhoneNumber('ZZ')
    @ApiModelProperty()
    phone?: string;
}
