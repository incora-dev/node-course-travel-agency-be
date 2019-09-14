import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Room} from '../rooms/room.entity';
import {Service} from '../services/service.entity';
import {Hotel} from '../hotel/hotel.entity';

@Entity()
export class Tour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @Column()
    description: string;

    @ManyToOne(type => Hotel, hotel => hotel.tours, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'hotelId' })
    hotel: Hotel;

    @Column({ nullable: false })
    hotelId: number;

    @OneToMany( type => Room, room => room.tour, { cascade: true })
    rooms: Room[];

    @ManyToMany(type => Service, service => service.tours, { cascade: true })
    @JoinTable()
    services: Service[];
}
