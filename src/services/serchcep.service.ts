import { HttpService } from '@nestjs/axios';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { catchError, map } from 'rxjs';

@Injectable()
export class SerchCepService {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async findAll(cep: string) {
    const userCep = this.httpService
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .pipe(
        map((response) => response.data),
        map((data) => data),
        catchError((error) => {
          throw new NotFoundException(`Não há registro para o cep ${cep}.`);
        }),
      );
    return userCep;
  }
  async cacheCep(cep: string) {
    const foundCep = await this.cacheManager.get(`${cep}`);
    if (!foundCep) {
      const newCep = await this.findAll(cep);
      newCep.subscribe(async (data) => {
        await this.cacheManager.set(`${cep}`, data);
      });
      return newCep;
    }
    return foundCep;
  }
}
