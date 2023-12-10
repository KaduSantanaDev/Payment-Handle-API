import { Param, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService){}

    @Post('checkout')
    async pay() {
        return this.paymentService.generatePayment()
    }

    @Get('session/:id')
    async getSession(@Param() {id}) {
        console.log(id)
        return this.paymentService.retrieveSession(id)
    }

}
