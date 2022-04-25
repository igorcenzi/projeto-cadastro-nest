import { HttpService } from '@nestjs/axios';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { SerchCepService } from 'src/services/serchcep.service';

@Controller('cep')
export class SearchCepController {
  constructor(
    private readonly searchCepService: SerchCepService,
    private httpService: HttpService,
  ) {}
  @Get(':cep')
  async findCep(@Param('cep') cep: string) {
    return await this.searchCepService.cacheCep(cep);
  }
}
