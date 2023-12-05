import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: process.env.SECRET
  }),PrismaModule],
  controllers: [
    AuthController,],
  providers: [
    AuthService,],
  exports: [AuthService]
})
export class AuthModule { }
