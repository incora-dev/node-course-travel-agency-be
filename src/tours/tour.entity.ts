import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Room} from 'src/rooms/room.entity';

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
}
