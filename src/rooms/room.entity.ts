import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {RoomType} from './enums/roomType.enum';
import {Tour} from '../tours/tour.entity';

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column('text')
    roomType: RoomType;

    @ManyToOne(type => Tour, tour => tour.rooms, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'tourId' })
    tour: Tour;

    @Column({ nullable: true })
    tourId: number;
}
