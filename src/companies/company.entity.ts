import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Address} from '../address/address.entity';
import {User} from '../users/user.entity';

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
    address1: Address;

    @OneToOne(type => Address, {cascade: true, nullable: true})
    @JoinColumn()
    address2?: Address;

    @OneToOne(type => User, user => user.company, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @Column({ nullable: false })
    ownerId: number;
}
