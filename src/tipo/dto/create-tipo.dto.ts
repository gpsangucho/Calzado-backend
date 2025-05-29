import { IsString } from 'class-validator';

export class CreateTipoDto {
    @IsString()
    name: string;
    }