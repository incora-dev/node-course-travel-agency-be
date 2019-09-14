import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Tour} from '../tours/tour.entity';

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    phone: string;

    @Column()
    rating: number;

    @OneToMany( type => Tour, tour => tour.hotel)
    tours: Tour[];
}
