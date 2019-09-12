import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    service: string;
}
