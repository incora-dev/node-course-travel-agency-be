import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Company } from '../companies/company.entity';
import { Rating } from '../rating/rating.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ length: 25 })
    firstName: string;

    @Column({ length: 25 })
    lastName: string;

    @Column({ select: false })
    @Exclude()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToOne(type => Company, company => company.owner)
    company: Company;

    @OneToMany(type => Rating, rating => rating.user)
    rating: Rating[];

}
