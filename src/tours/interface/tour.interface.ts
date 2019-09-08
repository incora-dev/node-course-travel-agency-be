import {RoomType} from '../enums/roomType.enum';

export interface ITour {
    _id?: number;
    price: number;
    roomType: RoomType;
    startDate: Date;
    endDate: Date;
    description: string;
}
