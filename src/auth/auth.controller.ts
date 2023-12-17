/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { EditUserDto } from './dtos/editUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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

  @Put('/edit/:id')
  async edit(@Body() user: EditUserDto, @Param('id') id) {
    return this.authService.edit(id, user)
  }
}
