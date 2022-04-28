import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
export declare class SerchCepService {
    private httpService;
    private readonly cacheManager;
    constructor(httpService: HttpService, cacheManager: Cache);
    findAll(cep: string): Promise<any>;
    cacheCep(cep: string): Promise<any>;
}
