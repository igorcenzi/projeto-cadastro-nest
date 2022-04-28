"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerchCepService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const axios_2 = require("axios");
let SerchCepService = class SerchCepService {
    constructor(httpService, cacheManager) {
        this.httpService = httpService;
        this.cacheManager = cacheManager;
    }
    async findAll(cep) {
        const userCep = await axios_2.default
            .get(`https://viacep.com.br/ws/${cep}/json`)
            .then((res) => res.data)
            .catch((_err) => {
            throw new common_1.NotFoundException(`CEP não encontrado.`);
        });
        if (userCep.erro) {
            throw new common_1.NotFoundException(`CEP não encontrado.`);
        }
        return await userCep;
    }
    async cacheCep(cep) {
        const foundCep = await this.cacheManager.get(`${cep}`);
        if (!foundCep) {
            const newCep = await this.findAll(cep);
            await this.cacheManager.set(`${cep}`, newCep);
            return await newCep;
        }
        return await foundCep;
    }
};
SerchCepService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object])
], SerchCepService);
exports.SerchCepService = SerchCepService;
//# sourceMappingURL=serchcep.service.js.map