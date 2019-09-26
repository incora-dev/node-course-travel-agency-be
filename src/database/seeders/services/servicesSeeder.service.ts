import {Inject, Injectable} from '@nestjs/common';
import { ServicesSeeds } from './data';
import { Repository } from 'typeorm';
import {Service} from '../../../services/service.entity';
import {IService} from '../../../services/interfaces/service.interface';

@Injectable()
export class ServicesSeederService {
    constructor(
        @Inject('SERVICE_REPOSITORY')
        private readonly serviceRepository: Repository<Service>,
    ) { }

    create(): Array<Promise<IService>> {
        return ServicesSeeds.map(async (service: IService) => {
            const serviceExist = await this.serviceRepository.findOne({ service: service.service });

            if (serviceExist) {
                return null;
            }

            return await this.serviceRepository.save(service);
        });
    }
}
