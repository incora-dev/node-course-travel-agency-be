import {Room} from '../../rooms/room.entity';

export interface ITour {
    _id?: number;
    startDate: Date;
    endDate: Date;
    description: string;
    rooms?: Room[];
}
