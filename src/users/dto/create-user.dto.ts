import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly cpf: string;
  @IsNumber()
  readonly cep: number;
  @IsString()
  readonly address: string;
  @IsNumber()
  readonly number: number;
  @IsString()
  readonly city: string;
  @IsString()
  readonly state: string;
  @IsString()
  readonly country: string;
  @IsString()
  readonly email: string;
  @IsString()
  password: string;
}
