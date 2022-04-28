import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly cpf: string;
  @IsString()
  readonly password: string;
}
