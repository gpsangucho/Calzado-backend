import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Tipo } from './tipos.entity';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';

@Injectable()
export class TiposService {
  constructor(
    @InjectRepository(Tipo)
    private readonly tipoRepo: Repository<Tipo>,
  ) {}

  async create(dto: CreateTipoDto): Promise<Tipo | null> {
    try {
      const tipo = this.tipoRepo.create(dto);
      return await this.tipoRepo.save(tipo);
    } catch (err) {
      console.error('Error creating tipo:', err);
      return null;
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Tipo> | null> {
    try {
      const query = this.tipoRepo.createQueryBuilder('tipo');
      return await paginate<Tipo>(query, options);
    } catch (err) {
      console.error('Error retrieving tipos:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Tipo | null> {
    try {
      return await this.tipoRepo.findOne({ where: { id } });
    } catch (err) {
      console.error('Error finding tipo:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateTipoDto): Promise<Tipo | null> {
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

  async remove(id: string): Promise<Tipo | null> {
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
