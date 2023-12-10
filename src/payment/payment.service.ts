import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe'
import { ProductType } from './enums/productType.enum';

@Injectable()
export class PaymentService {
  private stripe = new Stripe('sk_test_51My4ZJAtJK3MHkH3LteOSfCkfrDZd2BZAUnro0ncwzHwZt3WWEusLZYkGU3BJH0YSB6IQuHy3N6r0MUK3nXawp4i00FUdhAfH7', {apiVersion: '2023-10-16'})

  async generatePayment() {
    try {
      const session = await this.stripe.checkout.sessions.create({
        success_url: 'http://localhost:300/order',
        line_items: [
          {
            price: 'price_1OK2BaAtJK3MHkH3g9zjVD4i',
            quantity: 1
          }
        ],
        allow_promotion_codes: true,
        payment_method_types: ['card', 'boleto'],
        mode: 'payment'
      })

      return {'url': session.url, 'id': session.id}
    } catch (error) {
      console.error(error)
      throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async retrieveSession(sessionId) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId)

      return {'status': session.payment_status}
    } catch (error) {
      console.error(error)
    }
  }


  async genPromocode() {
  }


}

