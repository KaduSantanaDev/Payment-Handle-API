
import { OrderModule } from 'src/order/order.module';
import { StripeService } from './stripe.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [OrderModule, AuthModule],
    providers: [
        StripeService, ],
    exports: [StripeService]
})
export class StripeModule {}
