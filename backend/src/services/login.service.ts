import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../users/dto/login-dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
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
    const passwordMatch = await bcrypt.compare(user.password, foundUser.password);
    if (!passwordMatch) {
      throw new BadRequestException('Usuário ou senha incorretos.');
    }
    const access_token = this.jwtService.sign({ cpf: user.cpf, id: foundUser.id });
    return { token: access_token };
  }
}
