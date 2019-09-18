import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Tour} from '../tours/tour.entity';
import { Rating } from '../rating/rating.entity';
import { Image } from '../image/image.entity';

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

    @OneToMany(type => Rating, rating => rating.hotel)
    rating: Rating[];

    @OneToMany( type => Tour, tour => tour.hotel)
    tours: Tour[];

    @OneToMany(type => Image, image => image.hotel)
    images: Image[];
}
