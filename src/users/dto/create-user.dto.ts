import { IsNumber, IsString } from 'class-validator';


export class CreateUserDto {
  @IsString()
  nome: string;
  @IsString()
  cpf: string;
  @IsString()
  cep: number;
  @IsString()
  telefone: string;
  @IsString()
  logradouro: string;
  @IsNumber()
  numero: number;
  @IsString()
  cidade: string;
  @IsString()
  estado: string;
  @IsString()
  password: string;
}
