import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe'
import { ProductType } from './enums/productType.enum';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class PaymentService {
  private stripe = new Stripe('sk_test_51My4ZJAtJK3MHkH3LteOSfCkfrDZd2BZAUnro0ncwzHwZt3WWEusLZYkGU3BJH0YSB6IQuHy3N6r0MUK3nXawp4i00FUdhAfH7', {apiVersion: '2023-10-16'})
  constructor(private readonly stripeService: StripeService) {}
  async generatePayment() {
    return this.stripeService.checkout()
  }

  async retrieveSessionStatus(sessionId: string) {
    return (await this.getSession(sessionId)).status
  }


  private async getSession(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId)
      console.log(session)
      return session
    } catch (error) {
      console.error(error)
    }
  }
}

