import { HttpService } from '@nestjs/axios';
import { SerchCepService } from '../services/serchcep.service';
export declare class SearchCepController {
    private readonly searchCepService;
    private httpService;
    constructor(searchCepService: SerchCepService, httpService: HttpService);
    findCep(cep: string): Promise<any>;
}
