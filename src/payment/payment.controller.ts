import { Param, Controller, Get, Post, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService){}

    @UseGuards(AuthGuard)
    @Post('checkout')
    async pay() {
      return this.paymentService.generatePayment()
    }

    @Get('session/:id')
    async getSession(@Param() {id}) {
      console.log(id)
      return this.paymentService.retrieveSessionStatus(id)
    }

    @Get('success')
    async success() {
      return HttpStatus.OK
    }

}
