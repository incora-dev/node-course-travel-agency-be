import {RoomType} from '../enums/roomType.enum';

export interface IRoom {
    _id?: number;
    price: number;
    roomType: RoomType;
    tourId?: number;
}
