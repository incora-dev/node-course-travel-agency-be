import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {RoomType} from './enums/roomType.enum';

@Entity()
export class Tour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column('text')
    roomType: RoomType;

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @Column()
    description: string;
}
