import { IsNumberString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LocationDTO {
    @IsNumberString()
    @ApiModelProperty()
    readonly latitude: string;

    @IsNumberString()
    @ApiModelProperty()
    readonly longtitude: string;
}
export class UpdateLocationDTO {
    @IsOptional()
    id: number;

    @IsOptional()
    @IsNumberString()
    @ApiModelProperty()
    readonly latitude?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsNumberString()
    readonly longtitude?: string;
}
