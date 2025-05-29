import { IsOptional, IsString } from 'class-validator';

export class UpdateMarcaDto {
    @IsString()
    @IsOptional()
    name?: string;
    }