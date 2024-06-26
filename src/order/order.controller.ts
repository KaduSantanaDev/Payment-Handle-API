import { Controller, Get, Headers, Post, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async list() {
    return this.orderService.list()
  }

  @UseGuards(AuthGuard)
  @Post('test')
  async test(@Req() req) {
    return {data: req.tokenPayload}
  }
  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Req() req) {
    return this.orderService.create(req.tokenPayload.email)
  }
}
