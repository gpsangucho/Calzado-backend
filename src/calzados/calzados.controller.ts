import {
    Controller,
    Post,
    Get,
    Param,
    Delete,
    Body,
    Query,
    NotFoundException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { CalzadosService } from './calzados.service';
  import { CreateCalzadoDto } from './dto/create-calzado.dto';
  import { Calzado as CalzadoEntity } from './calzado.entity';
  import { Pagination } from 'nestjs-typeorm-paginate';
  import { SuccessResponseDto } from 'src/common/dto/response.dto';
  
  @Controller('calzados')
  export class CalzadosController {
    constructor(private readonly calzadosService: CalzadosService) {}
  
    @Post()
    async create(@Body() createCalzadoDto: CreateCalzadoDto): Promise<SuccessResponseDto<CalzadoEntity>> {
      const calzado = await this.calzadosService.create(createCalzadoDto);
      if (!calzado) throw new NotFoundException('Marca not found or error creating calzado');
      return new SuccessResponseDto('Calzado created successfully', calzado);
    }
  
    @Get()
    async findAll(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
    ): Promise<SuccessResponseDto<Pagination<CalzadoEntity>>> {
      limit = limit > 100 ? 100 : limit;
      const result = await this.calzadosService.findAll({ page, limit });
  
      if (!result) throw new InternalServerErrorException('Could not retrieve calzados');
  
      return new SuccessResponseDto('Calzados retrieved successfully', result);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<SuccessResponseDto<CalzadoEntity>> {
      const calzado = await this.calzadosService.findOne(id);
      if (!calzado) throw new NotFoundException('Calzado not found');
      return new SuccessResponseDto('Calzado retrieved successfully', calzado);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<SuccessResponseDto<string>> {
      const deleted = await this.calzadosService.remove(id);
      if (!deleted) throw new NotFoundException('Calzado not found or could not be deleted');
      return new SuccessResponseDto('Calzado deleted successfully', id);
    }
  }
  