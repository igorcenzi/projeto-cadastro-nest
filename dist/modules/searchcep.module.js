"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchCepModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const searchcep_controller_1 = require("../controllers/searchcep.controller");
const serchcep_service_1 = require("../services/serchcep.service");
const redisStore = require("cache-manager-redis-store");
let SearchCepModule = class SearchCepModule {
};
SearchCepModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            common_1.CacheModule.register({
                store: redisStore,
                socket: {
                    host: 'localhost',
                    port: 6379,
                },
                ttl: 60 * 3600 * 1000,
            }),
        ],
        controllers: [searchcep_controller_1.SearchCepController],
        providers: [serchcep_service_1.SerchCepService],
    })
], SearchCepModule);
exports.SearchCepModule = SearchCepModule;
//# sourceMappingURL=searchcep.module.js.map