import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';

import { Repository } from 'typeorm';
@Injectable()
export class VeriftCPFMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async use(req: Request, res: Response, next: () => void) {
    const user = await this.userRepository.findOne({
      where: { cpf: req.body.cpf },
    });
    if (user) {
      throw new BadRequestException(`CPF already exists.`);
    }
    next();
  }
}
