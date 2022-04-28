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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
const class_validator_1 = require("class-validator");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        const users = await this.userRepository.find();
        if (users.length === 0) {
            throw new common_1.HttpException('', 204);
        }
        users.map((user) => delete user.password);
        return users;
    }
    async findOne(id) {
        const isUuid = (0, class_validator_1.isUUID)(id);
        if (!isUuid) {
            throw new common_1.NotFoundException(`User ID: ${id} Not Found.`);
        }
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User ID: ${id} Not Found.`);
        }
        delete user.password;
        return user;
    }
    async create(CreateUserDto) {
        CreateUserDto.password = await bcrypt.hash(CreateUserDto.password, 8);
        const user = await this.userRepository.create(CreateUserDto);
        const newUser = await this.userRepository.save(user);
        delete newUser.password;
        return newUser;
    }
    async update(id, updateUserDto) {
        const isUuid = (0, class_validator_1.isUUID)(id);
        if (!isUuid) {
            throw new common_1.NotFoundException(`User ID: ${id} Not Found.`);
        }
        if (updateUserDto.cpf) {
            throw new common_1.BadRequestException(`Não é possível alterar o CPF.`);
        }
        const user = await this.userRepository.preload(Object.assign({ id: id }, updateUserDto));
        if (!user) {
            throw new common_1.NotFoundException(`User ID: ${id} Not Found.`);
        }
        return this.userRepository.save(user);
    }
    async remove(id) {
        const isUuid = (0, class_validator_1.isUUID)(id);
        if (!isUuid) {
            throw new common_1.NotFoundException(`User ID: ${id} Not Found.`);
        }
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User ID: ${id} Not Found.`);
        }
        return this.userRepository.delete(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map