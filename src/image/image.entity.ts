import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Hotel } from '../hotel/hotel.entity';

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column({nullable: true})
    hotelId: number;

    @ManyToOne(type => Hotel, hotel => hotel.images, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'hotelId'})
    hotel: Hotel;
}
