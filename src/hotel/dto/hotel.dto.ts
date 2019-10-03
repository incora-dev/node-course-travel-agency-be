import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { AddressDTO, UpdateAddressDTO } from '../../address/dto/address.dto';

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

    @ApiModelProperty()
    address: AddressDTO;
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
    @ApiModelProperty()
    address?: UpdateAddressDTO;
}
