import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Marca } from '../marcas/marcas.entity';
import { Tipo } from 'src/tipo/tipos.entity';

@Entity('calzados')
export class Calzado {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    descripcion: string;

    @ManyToOne(() => Marca, { eager: true })
    marca: Marca;

    @ManyToOne(() => Tipo, { eager: true })
    tipo: Tipo;
}

//  @ManyToOne(() => Marca, marca => marca.calzados)
//   marca: Marca;
//}