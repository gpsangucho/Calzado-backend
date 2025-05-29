import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Marca } from './marcas.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly tipoRepo: Repository<Marca>,
  ) {}

  async create(dto: CreateMarcaDto): Promise<Marca | null> {
    try {
      const tipo = this.tipoRepo.create(dto);
      return await this.tipoRepo.save(tipo);
    } catch (err) {
      console.error('Error creating tipo:', err);
      return null;
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Marca> | null> {
    try {
      const query = this.tipoRepo.createQueryBuilder('tipo');
      return await paginate<Marca>(query, options);
    } catch (err) {
      console.error('Error retrieving marcas:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Marca | null> {
    try {
      return await this.tipoRepo.findOne({ where: { id } });
    } catch (err) {
      console.error('Error finding tipo:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateMarcaDto): Promise<Marca | null> {
    try {
      const tipo = await this.findOne(id);
      if (!tipo) return null;

      Object.assign(tipo, dto);
      return await this.tipoRepo.save(tipo);
    } catch (err) {
      console.error('Error updating tipo:', err);
      return null;
    }
  }

  async remove(id: string): Promise<Marca | null> {
    try {
      const tipo = await this.findOne(id);
      if (!tipo) return null;

      return await this.tipoRepo.remove(tipo);
    } catch (err) {
      console.error('Error deleting tipo:', err);
      return null;
    }
  }
}
