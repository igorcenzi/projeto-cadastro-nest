/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RecoveryPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async resetPassword(cpf: string){
    const user = await this.userRepository.findOne({where: {cpf: cpf}});
    if(!user){
      throw new NotFoundException('Usuário não encontrado.')
    }
    const id = user.id;
    const newPassword = await axios
    .get('https://www.passwordrandom.com/query?command=password&format=json&count=1')
    .then(resp => resp.data.char[0]);
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    const updatedUser = await this.userRepository.preload({
      id: id,
      password: hashedPassword
    });
    if(!updatedUser){
      throw new InternalServerErrorException("Erro no servidor.")
    }
    this.userRepository.save(updatedUser);
    return {"new password": newPassword};
  }
}
