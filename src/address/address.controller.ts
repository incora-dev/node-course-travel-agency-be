import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDTO, UpdateAddressDTO } from './dto/address.dto';
import { IAddress } from './interface/address.interface';
import { Address } from './address.entity';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    async get(): Promise<Address[]> {
        return await this.addressService.getAll();
    }
    @Post()
    async create(@Body() address: AddressDTO): Promise<IAddress> {
        return await this.addressService.create(address);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UpdateAddressDTO): Promise<IAddress> {
        return await this.addressService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<IAddress> {
        return await this.addressService.delete(id);
    }
}
