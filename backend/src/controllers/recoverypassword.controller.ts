import { Controller, Get, Param } from "@nestjs/common";
import { RecoveryPasswordService } from '../services/recoverypassword.service'

@Controller('recovery')
export class RecoveryPasswordController {
  constructor(private readonly recoveryPasswordService: RecoveryPasswordService) {}
  @Get(':cpf')
  resetPassword(@Param('cpf') cpf: string){
    return this.recoveryPasswordService.resetPassword(cpf)
  }
}
