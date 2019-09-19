import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Service} from './service.entity';
import {IService} from './interfaces/service.interface';

@Injectable()
export class ServicesService {
    constructor(
        @Inject('SERVICE_REPOSITORY')
        private readonly serviceRepository: Repository<Service>,
    ) { }

    async getAll(): Promise<IService[]> {
        return await this.serviceRepository.find();
    }
}
