import {
    Controller, Get, Post, Put, Delete,
    Param, Body, Query, NotFoundException, InternalServerErrorException
  } from '@nestjs/common';
  import { TiposService } from './tipos.service';
  import { CreateTipoDto } from './dto/create-tipo.dto';
  import { UpdateTipoDto } from './dto/update-tipo.dto';
  import { Pagination } from 'nestjs-typeorm-paginate';
  import { Tipo } from './tipos.entity';
  import { SuccessResponseDto } from 'src/common/dto/response.dto';
  
  @Controller('tipos')
  export class TiposController {
    constructor(private readonly tiposService: TiposService) {}
  
    @Post()
    async create(@Body() dto: CreateTipoDto) {
      const tipo = await this.tiposService.create(dto);
      if (!tipo) throw new InternalServerErrorException('Failed to create tipo');
      return new SuccessResponseDto('Tipo created successfully', tipo);
    }
  
    @Get()
    async findAll(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
    ): Promise<SuccessResponseDto<Pagination<Tipo>>> {
      const result = await this.tiposService.findAll({ page, limit });
  
      if (!result) throw new InternalServerErrorException('Could not retrieve tipos');
  
      return new SuccessResponseDto('Tipos retrieved successfully', result);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const tipo = await this.tiposService.findOne(id);
      if (!tipo) throw new NotFoundException('Tipo not found');
      return new SuccessResponseDto('Tipo retrieved successfully', tipo);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateTipoDto) {
      const tipo = await this.tiposService.update(id, dto);
      if (!tipo) throw new NotFoundException('Tipo not found');
      return new SuccessResponseDto('Tipo updated successfully', tipo);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const tipo = await this.tiposService.remove(id);
      if (!tipo) throw new NotFoundException('Tipo not found');
      return new SuccessResponseDto('Tipo deleted successfully', tipo);
    }
  }
  