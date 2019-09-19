import {Controller, Get} from '@nestjs/common';
import {ServicesService} from './services.service';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {IService} from './interfaces/service.interface';

@ApiUseTags('services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Get()
    @ApiResponse({ status: 200, description: '```Ok``` List of Services' })
    async getAll(): Promise<IService[]> {
        return await this.servicesService.getAll();
    }
}
