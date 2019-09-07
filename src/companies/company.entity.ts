import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    contactEmail: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    city: string;

    @Column({ length: 50})
    state: string;

    @Column()
    address1: string;

    @Column({nullable: true})
    address2: string;

    @Column({ length: 25 })
    zip: string;
}
