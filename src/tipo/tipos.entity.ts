import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipos')
export class Tipo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}