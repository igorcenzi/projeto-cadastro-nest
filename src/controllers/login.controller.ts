/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginService } from 'src/services/login.service';
import { LoginDto } from 'src/users/dto/login-dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @HttpCode(200)
  @Post()
  login(@Body() user: LoginDto) {
    return this.loginService.login(user);
  }
}
