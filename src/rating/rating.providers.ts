import { Connection } from 'typeorm';
import { Rating } from './rating.entity';

export const ratingProviders = [
    {
        provide: 'RATING_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Rating),
        inject: ['DATABASE_CONNECTION'],
    },
];
