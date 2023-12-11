/*
https://docs.nestjs.com/providers#services
*/
import { Stripe } from 'stripe'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  private stripe = new Stripe('sk_test_51My4ZJAtJK3MHkH3LteOSfCkfrDZd2BZAUnro0ncwzHwZt3WWEusLZYkGU3BJH0YSB6IQuHy3N6r0MUK3nXawp4i00FUdhAfH7', {apiVersion: '2023-10-16'})
  async checkout() {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card', 'boleto'],
        line_items: [{
          price: 'price_1OLgmcAtJK3MHkH39Rr35Y4B',
          quantity: 1,
        }],
        mode: 'payment',
        discounts: [{
          coupon: 's1EuRkrQ'&&'slPhY5mI',
        }],
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });
      return {'url': session.url, 'id': session.id}
    } catch (error) {
      console.error(error)
      throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

}
