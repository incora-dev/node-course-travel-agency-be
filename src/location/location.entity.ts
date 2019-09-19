import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    latitude: string;

    @Column()
    longtitude: string;
}
