import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Address} from '../address/address.entity';

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    contactEmail: string;

    @Column({ length: 50 })
    name: string;

    @OneToOne(type => Address, {cascade: true})
    @JoinColumn()
    address1: Address;

    @OneToOne(type => Address, {cascade: true})
    @JoinColumn()
    address2?: Address;
}
