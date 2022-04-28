import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from '../users/dto/login-dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @HttpCode(200)
  @Post()
  async login(@Body() user: LoginDto) {
    return await this.loginService.login(user);
  }
}
