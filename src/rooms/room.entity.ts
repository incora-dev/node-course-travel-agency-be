import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {RoomType} from './enums/roomType.enum';

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column('text')
    roomType: RoomType;
}
