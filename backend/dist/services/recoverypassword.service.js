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
exports.RecoveryPasswordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const axios_1 = require("axios");
const bcrypt = require("bcrypt");
let RecoveryPasswordService = class RecoveryPasswordService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async resetPassword(cpf) {
        const user = await this.userRepository.findOne({ where: { cpf: cpf } });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        const id = user.id;
        const newPassword = await axios_1.default
            .get('https://www.passwordrandom.com/query?command=password&format=json&count=1')
            .then(resp => resp.data.char[0]);
        const hashedPassword = await bcrypt.hash(newPassword, 8);
        const updatedUser = await this.userRepository.preload({
            id: id,
            password: hashedPassword
        });
        if (!updatedUser) {
            throw new common_1.InternalServerErrorException("Erro no servidor.");
        }
        this.userRepository.save(updatedUser);
        return { "new password": newPassword };
    }
};
RecoveryPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecoveryPasswordService);
exports.RecoveryPasswordService = RecoveryPasswordService;
//# sourceMappingURL=recoverypassword.service.js.map