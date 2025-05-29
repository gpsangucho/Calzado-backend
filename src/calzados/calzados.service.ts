import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Calzado } from './calzado.entity';
import { CreateCalzadoDto } from './dto/create-calzado.dto';
import { Marca } from '../marcas/marcas.entity';
import { Tipo } from 'src/tipo/tipos.entity';

@Injectable()
export class CalzadosService {
  constructor(
    @InjectRepository(Calzado)
    private calzadosRepository: Repository<Calzado>,
    @InjectRepository(Marca)
    private marcasRepository: Repository<Marca>,
  ) {}

  async create(createCalzadoDto: CreateCalzadoDto): Promise<Calzado | null> {
    try {
      const marca = await this.marcasRepository.findOne({ where: { id: createCalzadoDto.marcaId } });
      if (!marca) return null;

      const calzado = this.calzadosRepository.create({
        title: createCalzadoDto.title,
        descripcion: createCalzadoDto.content,
        marca: marca,
        //tipo_ : Tipo,
      });

      return await this.calzadosRepository.save(calzado);
    } catch (err) {
      console.error('Error creating calzado:', err);
      return null;
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Calzado> | null> {
    try {
      const queryBuilder = this.calzadosRepository.createQueryBuilder('calzado');
      queryBuilder.leftJoinAndSelect('calzado.marca', 'marca');
      return await paginate<Calzado>(queryBuilder, options);
    } catch (err) {
      console.error('Error fetching calzados:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Calzado | null> {
    try {
      return await this.calzadosRepository.findOne({ where: { id }, relations: ['marca'] });
    } catch (err) {
      console.error('Error fetching calzado:', err);
      return null;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.calzadosRepository.delete(id);
      return result.affected !== 0;
    } catch (err) {
      console.error('Error deleting calzado:', err);
      return false;
    }
  }
}

// https://francisco-higuera.netlify.app/
// npm run start