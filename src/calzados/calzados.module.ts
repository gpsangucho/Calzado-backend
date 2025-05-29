import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalzadosService } from './calzados.service';
import { CalzadosController } from './calzados.controller';
import { Calzado } from './calzado.entity';
import { Marca } from '../marcas/marcas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calzado, Marca])],
  controllers: [CalzadosController],
  providers: [CalzadosService],
})
export class CalzadosModule {}