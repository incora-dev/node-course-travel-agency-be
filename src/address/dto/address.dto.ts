import { IsString, IsOptional } from 'class-validator';
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
    @ApiModelProperty()
    location?: UpdateLocationDTO;
}
