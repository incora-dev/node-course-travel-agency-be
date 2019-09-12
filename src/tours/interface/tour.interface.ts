import {Room} from '../../rooms/room.entity';
import {Service} from '../../services/service.entity';

export interface ITour {
    _id?: number;
    startDate: Date;
    endDate: Date;
    description: string;
    rooms?: Room[];
    services?: Service[];
}
