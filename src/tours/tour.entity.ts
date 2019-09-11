import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Tour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @Column()
    description: string;
}
