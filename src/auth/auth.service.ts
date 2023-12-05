import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';


@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService){}
  async register(user: CreateUserDto){
    try {
      const createdUser = await this.prismaService.users.create({
        data: user
      })
      if (createdUser.email === null || createdUser.name === null || createdUser.password === null) {
        throw new HttpException('Missing params.', HttpStatus.BAD_REQUEST)
      }
      return createdUser

    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  private createToken({name, email}){
    const token = this.jwtService.sign({
      name,
      email
    })

    return {"token": token}
  }

  async isValidToken(token: string){
    try {
      const decoded = this.jwtService.verify(token)
      return decoded
    } catch (error) {
      throw new Error(error)
    }
  }

  async login(loginData: LoginDto) {
    const user = await this.findOne(loginData)

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
    }

    return this.createToken(user)
  }

  async list() {
    return this.prismaService.users.findMany()
  }

  private async findOne(data: LoginDto) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email: data.email,
        password: data.password
      }
    })

    return user
  }

}
