import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposService } from './tipos.service';
import { TiposController } from './tipos.controller';
import { Tipo } from './tipos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tipo])],
  controllers: [TiposController],
  providers: [TiposService],
})
export class TiposModule {}