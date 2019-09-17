import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

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
    readonly zip: number;
}

export class UpdateAddressDTO {
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
    readonly zip?: number;
}
