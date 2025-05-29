import { IsOptional, IsString } from 'class-validator';

export class UpdateTipoDto {
    @IsString()
    @IsOptional()
    name?: string;
    }