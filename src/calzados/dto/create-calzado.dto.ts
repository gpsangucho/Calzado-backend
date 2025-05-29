import { IsString, IsUUID } from 'class-validator';

    export class CreateCalzadoDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsUUID()
    marcaId: string;
}

