import { IsNumber, Min, Max } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RatingDTO {
    @IsNumber()
    @Min(1)
    @Max(5)
    @ApiModelProperty()
    rating: number;

    @IsNumber()
    @ApiModelProperty()
    hotelId: number;

    @IsNumber()
    @ApiModelProperty()
    userId: number;
}

export class CreateRatingDTO {
    @IsNumber()
    @Min(1)
    @Max(5)
    @ApiModelProperty()
    rating: number;
}
