import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ImageDTO {
    @IsString()
    @ApiModelProperty()
    readonly image: string;

    @IsNumber()
    @ApiModelProperty()
    readonly hotelId: number;
}
