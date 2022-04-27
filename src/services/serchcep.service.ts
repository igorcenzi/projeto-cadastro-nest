import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import axios from 'axios';

@Injectable()
export class SerchCepService {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async findAll(cep: string) {
    const userCep = await axios
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .then((res) => res.data)
      .catch((_err) => {
        throw new NotFoundException(`CEP não encontrado.`);
      });
    if (userCep.erro) {
      throw new NotFoundException(`CEP não encontrado.`);
    }
    return userCep;
  }
  async cacheCep(cep: string) {
    const foundCep = await this.cacheManager.get(`${cep}`);
    if (!foundCep) {
      const newCep = await this.findAll(cep);
      await this.cacheManager.set(`${cep}`, newCep);
      return newCep;
    }
    return foundCep;
  }
}
