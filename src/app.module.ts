import { StripeModule } from './stripe/stripe.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    StripeModule,
    AuthModule,
    PrismaModule,
    OrderModule,
    PaymentModule,],
  providers: [AppService],
})


export class AppModule { }
