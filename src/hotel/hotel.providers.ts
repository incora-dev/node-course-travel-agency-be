import { Connection } from 'typeorm';
import { Hotel } from './hotel.entity';

export const hotelProviders = [
    {
        provide: 'HOTEL_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Hotel),
        inject: ['DATABASE_CONNECTION'],
    },
];