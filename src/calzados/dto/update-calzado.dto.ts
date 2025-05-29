import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCalzadoDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsUUID()
    marcaId?: string;
}
