import {Column, Entity, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import {Tour} from '../tours/tour.entity';

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    service: string;

    @ManyToMany(type => Tour, tour => tour.services, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    tours: Tour[];
}
