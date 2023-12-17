import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe'
import { StripeService } from 'src/stripe/stripe.service';
import { OrderService } from 'src/order/order.service';
import { AuthService } from 'src/auth/auth.service';
import { Status } from 'src/order/enums/status.enum';
import { ProductType } from './enums/productType.enum';

@Injectable()
export class PaymentService {
  private stripe = new Stripe('sk_test_51My4ZJAtJK3MHkH3LteOSfCkfrDZd2BZAUnro0ncwzHwZt3WWEusLZYkGU3BJH0YSB6IQuHy3N6r0MUK3nXawp4i00FUdhAfH7', {apiVersion: '2023-10-16'})
  constructor(private readonly stripeService: StripeService, private readonly orderService: OrderService, private readonly authService: AuthService) {}
  async generatePayment(product: ProductType) {
    return this.stripeService.checkout(product)
  }

  async retrieveSessionStatus(sessionId: string, userEmail: string) {
    const orderStatus = (await this.getSession(sessionId)).status
    const user =  await this.authService.findByEmail(userEmail)
    const [firstOrder] = user.orders
    if (orderStatus === 'complete'){
      await this.orderService.changeOrderStatus(firstOrder.id, Status.Approved)
    }

    return this.authService.findOne(userEmail)
  }


  private async getSession(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId)
      return session
    } catch (error) {
      console.error(error)
    }
  }
}

