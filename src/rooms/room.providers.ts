import {Connection} from 'typeorm';
import {Room} from './room.entity';

export const roomProviders = [
    {
        provide: 'ROOM_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Room),
        inject: ['DATABASE_CONNECTION'],
    },
];
