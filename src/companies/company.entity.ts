import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Address} from '../address/address.entity';
import {User} from '../users/user.entity';
import {Hotel} from '../hotel/hotel.entity';

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    contactEmail: string;

    @Column({ length: 50 })
    name: string;

    @OneToOne(type => Address, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    address: Address;

    @OneToOne(type => User, user => user.company, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @Column({ nullable: false })
    ownerId: number;

    @OneToMany(type => Hotel, hotel => hotel.company)
    hotels: Hotel[];
}
