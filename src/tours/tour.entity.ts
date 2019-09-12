import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Room} from '../rooms/room.entity';
import {Service} from '../services/service.entity';

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

    @OneToMany( type => Room, room => room.tour)
    rooms: Room[];

    @ManyToMany(type => Service, service => service.tours, { cascade: true })
    @JoinTable()
    services: Service[];
}
