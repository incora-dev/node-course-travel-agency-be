import {Connection} from 'typeorm';
import {Tour} from './tour.entity';

export const tourProviders = [
    {
        provide: 'TOUR_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Tour),
        inject: ['DATABASE_CONNECTION'],
    },
];
