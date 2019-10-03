import {Connection} from 'typeorm';
import {Service} from './service.entity';

export const serviceProviders = [
    {
        provide: 'SERVICE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Service),
        inject: ['DATABASE_CONNECTION'],
    },
];
