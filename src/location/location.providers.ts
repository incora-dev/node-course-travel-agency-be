import { Connection } from 'typeorm';
import { Location } from './location.entity';

export const locationProviders = [
    {
        provide: 'LOCATION_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Location),
        inject: ['DATABASE_CONNECTION'],
    },
];
