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
exports.RecoveryPasswordController = void 0;
const common_1 = require("@nestjs/common");
const recoverypassword_service_1 = require("../services/recoverypassword.service");
let RecoveryPasswordController = class RecoveryPasswordController {
    constructor(recoveryPasswordService) {
        this.recoveryPasswordService = recoveryPasswordService;
    }
    resetPassword(cpf) {
        return this.recoveryPasswordService.resetPassword(cpf);
    }
};
__decorate([
    (0, common_1.Get)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecoveryPasswordController.prototype, "resetPassword", null);
RecoveryPasswordController = __decorate([
    (0, common_1.Controller)('recovery'),
    __metadata("design:paramtypes", [recoverypassword_service_1.RecoveryPasswordService])
], RecoveryPasswordController);
exports.RecoveryPasswordController = RecoveryPasswordController;
//# sourceMappingURL=recoverypassword.controller.js.map