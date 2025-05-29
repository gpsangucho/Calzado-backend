import {
    Controller, Get, Post, Put, Delete,
    Param, Body, Query, NotFoundException, InternalServerErrorException
  } from '@nestjs/common';
  import { MarcasService } from './marcas.service';
  import { CreateMarcaDto } from './dto/create-marca.dto';
  import { UpdateMarcaDto } from './dto/update-marca.dto';
  import { Pagination } from 'nestjs-typeorm-paginate';
  import { Marca } from './marcas.entity';
  import { SuccessResponseDto } from 'src/common/dto/response.dto';
  
  @Controller('marcas')
  export class MarcasController {
    constructor(private readonly marcasService: MarcasService) {}
  
    @Post()
    async create(@Body() dto: CreateMarcaDto) {
      const marca = await this.marcasService.create(dto);
      if (!marca) throw new InternalServerErrorException('Failed to create marca');
      return new SuccessResponseDto('Marca created successfully', marca);
    }
  
    @Get()
    async findAll(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
    ): Promise<SuccessResponseDto<Pagination<Marca>>> {
      const result = await this.marcasService.findAll({ page, limit });
  
      if (!result) throw new InternalServerErrorException('Could not retrieve marcas');
  
      return new SuccessResponseDto('Marcas retrieved successfully', result);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const marca = await this.marcasService.findOne(id);
      if (!marca) throw new NotFoundException('Marca not found');
      return new SuccessResponseDto('Marca retrieved successfully', marca);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateMarcaDto) {
      const marca = await this.marcasService.update(id, dto);
      if (!marca) throw new NotFoundException('Marca not found');
      return new SuccessResponseDto('Marca updated successfully', marca);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const marca = await this.marcasService.remove(id);
      if (!marca) throw new NotFoundException('Marca not found');
      return new SuccessResponseDto('Marca deleted successfully', marca);
    }
  }
  