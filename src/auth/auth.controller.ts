/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Header } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user)
  }

  @Get()
  async list(){
    return this.authService.list()
  }

  @Post('/login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData)
  }
}
