import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LocationDTO, UpdateLocationDTO } from '../../location/dto/location.dto';

export class AddressDTO {
    @IsString()
    @ApiModelProperty()
    readonly country: string;

    @IsString()
    @ApiModelProperty()
    readonly city: string;

    @IsString()
    @ApiModelProperty()
    readonly state: string;

    @IsString()
    @ApiModelProperty()
    readonly street: string;

    @IsNumber()
    @ApiModelProperty()
    readonly address1: number;

    @IsOptional()
    @IsNumber()
    @ApiModelProperty()
    readonly address2?: number;

    @IsNumber()
    @ApiModelProperty()
    readonly zip: number;

    @IsOptional()
    @ApiModelProperty()
    location?: LocationDTO;
}

export class UpdateAddressDTO {
    @IsOptional()
    id: number;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly country?: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly city?: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly state?: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly street?: string;

    @IsOptional()
    @IsNumber()
    @ApiModelProperty()
    readonly address1?: number;

    @IsOptional()
    @IsNumber()
    @ApiModelProperty()
    readonly address2?: number;

    @IsOptional()
    @IsNumber()
    @ApiModelProperty()
    readonly zip?: number;

    @IsOptional()
    @ApiModelProperty()
    location?: UpdateLocationDTO;
}
