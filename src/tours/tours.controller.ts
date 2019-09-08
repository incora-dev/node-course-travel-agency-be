import {Controller, Get, Param} from '@nestjs/common';
import {ApiUseTags, ApiImplicitParam, ApiResponse} from '@nestjs/swagger';
import {ToursService} from './tours.service';
import {ITour} from './interface/tour.interface';

@ApiUseTags('tours')
@Controller('tours')
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Ok ```Tour Object```'})
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    getOneById(@Param('id') id: number): Promise<ITour> {
        return this.toursService.getOneByParams({ id });
    }
}
