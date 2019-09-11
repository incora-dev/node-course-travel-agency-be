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

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(5)
    @ApiModelProperty()
    rating: number;

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

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(5)
    @ApiModelProperty()
    rating?: number;
}
