import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from '../hotel/hotel.entity';
import { User } from '../users/user.entity';

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column({ nullable: true })
    hotelId: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(type => Hotel, hotel => hotel.rating, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'hotelId'})
    hotel: Hotel;

    @ManyToOne(type => User, user => user.rating)
    @JoinColumn({ name: 'userId' })
    user: User;
}
