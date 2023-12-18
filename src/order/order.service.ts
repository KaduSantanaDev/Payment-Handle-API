import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { Status } from './enums/status.enum';
import { UpdateOrder } from './dtos/updateOrder.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {}

  async list() {
    return this.prismaService.orders.findMany({
      include: {
        user: true
      }
    })
  }

  async create(email: string) {
    const user = await this.prismaService.users.findUnique({
      where: {email}
    })
    if (!user) {
      throw new BadRequestException()
    }
    return this.prismaService.orders.create({
      data: {
        userId: user.id
      },
      include: {
        user: false,
      }
    })
  }

  async changeOrderStatus(id, status) {
    await this.prismaService.orders.update({
      where: {
        id
      },
      data: {
        status
      }
    })
  }
}
