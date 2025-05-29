import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('marcas')
export class Marca {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}