import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import {Tour} from '../tours/tour.entity';
import { Rating } from '../rating/rating.entity';
import { Image } from '../image/image.entity';
import {Company} from '../companies/company.entity';
import { Address } from '../address/address.entity';

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

    @ManyToOne(type => Company, company => company.hotels, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'companyId' })
    company: Company;

    @Column({ nullable: false })
    companyId: number;

    @Column({ nullable: true })
    addressId: number;

    @OneToOne(type => Address, { cascade: true })
    @JoinColumn({ name: 'addressId' })
    address: Address;
}
