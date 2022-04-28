import {
  BadRequestException,
  HttpCode,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new HttpException('', 204);
    }
    users.map((user) => delete user.password);
    return users;
  }

  async findOne(cpf: string) {
    const user = await this.userRepository.findOne({where: {cpf: cpf}});
    if (!user) {
      throw new NotFoundException(`User CPF: ${cpf} Not Found.`);
    }
    delete user.password;
    return user;
  }

  async create(CreateUserDto: CreateUserDto) {
    CreateUserDto.password = await bcrypt.hash(CreateUserDto.password, 8);
    const user = await this.userRepository.create(CreateUserDto);
    const newUser = await this.userRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const isUuid = isUUID(id)
    if(!isUuid){
      throw new NotFoundException(`User ID: ${id} Not Found.`);
    }
    if (updateUserDto.cpf) {
      throw new BadRequestException(`Não é possível alterar o CPF.`);
    }
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User ID: ${id} Not Found.`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const isUuid = isUUID(id)
    if(!isUuid){
      throw new NotFoundException(`User ID: ${id} Not Found.`);
    }
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new NotFoundException(`User ID: ${id} Not Found.`);
      }
      return this.userRepository.delete(user);
  }
}
