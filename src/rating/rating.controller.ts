import { Controller, Get, Post, Body, Param, Request, UseGuards  } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingDTO, CreateRatingDTO } from './dto/rating.dto';
import { AuthGuard } from '@nestjs/passport';
import { IRating } from './interface/rating.interface';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('rating')
@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Get(':id')
    @ApiResponse({ status: 200, description: '```Ok``` Hotel average rating' })
    async get(@Param('id') hotelId: number): Promise<number> {
        return await this.ratingService.getAverage(hotelId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 404, description: '```Not found```' })
    @ApiResponse({ status: 403, description: '```Forbidden``` You can\'t leave rating twice' })
    @ApiResponse({ status: 201, description: '```Created ```' })
    @ApiResponse({ status: 401, description: '```Unauthorized```' })
    async add(@Request() req, @Param('id') hotelId: number, @Body() rating: CreateRatingDTO): Promise<IRating> {
        const authorizedUser = req.user;
        const userId = authorizedUser.userId;
        return await this.ratingService.addPoint(rating, hotelId, userId);
    }
}
