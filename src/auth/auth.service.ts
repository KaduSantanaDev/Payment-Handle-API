import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/createUser.dto';


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
      throw new HttpException('Missing params.', HttpStatus.BAD_REQUEST)
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

  async login({email, password}) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email,
        password
      }
    })

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    return this.createToken(user)
  }

  async list() {
    return this.prismaService.users.findMany()
  }

}
