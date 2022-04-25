import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/users/dto/login-dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOne({
      where: { cpf: user.cpf },
    });
    if (!foundUser) {
      throw new BadRequestException('Usuário ou senha incorretos.');
    }
    const passwordMatch = bcrypt.compare(user.password, foundUser.password);
    if (!passwordMatch) {
      throw new BadRequestException('Usuário ou senha incorretos.');
    }
    const access_token = await this.jwtService.sign({ cpf: user.cpf });
    return { token: access_token };
  }
}
