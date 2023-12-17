import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { EditUserDto } from './dtos/editUser.dto';
import { hash } from 'bcrypt'
import { compare } from 'bcrypt';
import { Role } from './enums/RoleEnum';
import { Status } from 'src/order/enums/status.enum';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService){}

  async register(user: CreateUserDto){
    try {
      const password = await this.hashPassword(user.password)
      const createdUser = await this.prismaService.users.create({
        data: {
          ...user,
          password
        }
      })
      if (createdUser.email === null || createdUser.password === null) {
        throw new HttpException('Missing params.', HttpStatus.BAD_REQUEST)
      }
      return {'status': HttpStatus.CREATED, message: 'Usuário criado com sucesso!'}

    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  private createToken({email}){
    const token = this.jwtService.sign({
      email
    })

    return {"token": token}
  }

  isValidToken(token: string){
    try {
      return this.jwtService.verify(token)
    } catch (error) {
      throw new HttpException('Forbidden resource.', HttpStatus.FORBIDDEN)
    }
  }

  async login(loginData: LoginDto) {
    const user = await this.prismaService.users.findFirst({where: {
      email: loginData.email
    }})
    const password = compare(loginData.password, user.password)


    if (!user || !password) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
    }

    return this.createToken(user)
  }

  async list() {
    return this.prismaService.users.findMany({
      select: {
        id:false,
        password:false,
        email: true,
        orders: true,
      }
    })
  }

  async findOne(email: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email
      }
    })

    return user
  }

  async findByEmail(email: string) {
    return this.prismaService.users.findUnique({
      where: {
        email
      },
      select: {
        orders: true
      },
    })
  }

  async edit(id: string, editUserDto: EditUserDto) {
    try {
      const numId = parseInt(id)
      const editedUser = await this.prismaService.users.update({
        where: {
          id: numId
        },
        data: editUserDto
      })

      if(!editedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  private async hashPassword(password) {
    return hash(password, 8)
  }

}
