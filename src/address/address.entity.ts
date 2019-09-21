import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Location } from '../location/location.entity';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    street: string;

    @Column()
    address1: string;

    @Column({nullable: true})
    address2: string;

    @Column()
    zip: number;

    @Column({ nullable: true })
    locationId: number;

    @OneToOne(type => Location, { cascade: true })
    @JoinColumn({ name: 'locationId' })
    location: Location;
}
