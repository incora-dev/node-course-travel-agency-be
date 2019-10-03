import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDTO, UpdateAddressDTO } from './dto/address.dto';
import { IAddress } from './interface/address.interface';
import { Address } from './address.entity';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('address')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    @ApiResponse({ status: 200, description: '```Ok```' })
    async get(): Promise<Address[]> {
        return await this.addressService.getAll();
    }
    @Post()
    @ApiResponse({ status: 201, description: '```Created ```' })
    @ApiResponse({ status: 403, description: '```Forbidden``` User already exists' })
    async create(@Body() address: AddressDTO): Promise<IAddress> {
        return await this.addressService.create(address);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: '```Ok``` Successfully updated' })
    @ApiResponse({ status: 404, description: '```Not found```' })
    async update(@Param('id') id: number, @Body() data: UpdateAddressDTO): Promise<IAddress> {
        return await this.addressService.update(id, data);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: '```Ok``` Successfully removed' })
    @ApiResponse({ status: 404, description: '```Not Found```' })
    async delete(@Param('id') id: number): Promise<IAddress> {
        return await this.addressService.delete(id);
    }
}
