
import { StripeService } from './stripe.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    providers: [
        StripeService, ],
    exports: [StripeService]
})
export class StripeModule {}
