import { Param, Controller, Get, Post, HttpStatus, UseGuards, Req, Put, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductType } from './enums/productType.enum';

@ApiBearerAuth()
@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService){}

  @UseGuards(AuthGuard)
  @Post('checkout')
  async pay(@Body('type') productType) {
    return this.paymentService.generatePayment(productType)
  }

  @UseGuards(AuthGuard)
  @Put('session/:id')
  async getSession(@Param('id') id: string, @Req() req) {
    return this.paymentService.retrieveSessionStatus(id, req.tokenPayload.email)
  }

  @Get('products')
  async success(@Query('productName') productName) {
    return this.paymentService.getProductByName(productName)
  }

}
