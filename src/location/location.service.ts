import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import { LocationDTO, UpdateLocationDTO } from './dto/location.dto';
import { ILocation } from './interface/location.interface';

@Injectable()
export class LocationService {
    constructor(@Inject('LOCATION_REPOSITORY')
    private readonly locationRepository: Repository<Location>) {}

    async create(location: LocationDTO): Promise<ILocation> {
        const isLocationExist = await this.getOneByParams({latitude: location.latitude, longtitude: location.longtitude});
        if (isLocationExist) {
            throw new HttpException('Location exists!', 400);
        }
        return await this.locationRepository.save(location);
    }

    async update(id: number, data: UpdateLocationDTO): Promise<ILocation> {
        return await this.locationRepository.save({ ...data, id: Number(id) });
    }

    async delete(id: number): Promise<ILocation> {
        const toRemove = await this.locationRepository.findOne(id);
        return this.locationRepository.remove(toRemove);
    }

    async getOneByParams(params: object): Promise<ILocation> {
        return await this.locationRepository.findOne(params);
    }
}
