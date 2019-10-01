import { createConnection } from 'typeorm';
import {Address} from '../address/address.entity';
import {Company} from '../companies/company.entity';
import {Hotel} from '../hotel/hotel.entity';
import {Rating} from '../rating/rating.entity';
import {Room} from '../rooms/room.entity';
import {Service} from '../services/service.entity';
import {Tour} from '../tours/tour.entity';
import {User} from '../users/user.entity';
import {Image} from '../image/image.entity';
import {Location} from '../location/location.entity';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'travel_agency_db',
            entities: [
                Address,
                Company,
                Hotel,
                Image,
                Location,
                Rating,
                Room,
                Service,
                Tour,
                User,
            ],
            synchronize: true,
        }),
    },
];
