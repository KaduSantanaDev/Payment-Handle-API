/*
https://docs.nestjs.com/providers#services
*/
import { Stripe } from 'stripe'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductType, Products } from 'src/payment/enums/productType.enum';
import { OrderService } from 'src/order/order.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class StripeService {
  constructor(private readonly orderService: OrderService, private readonly authService: AuthService) {}
  private stripe = new Stripe('sk_test_51My4ZJAtJK3MHkH3LteOSfCkfrDZd2BZAUnro0ncwzHwZt3WWEusLZYkGU3BJH0YSB6IQuHy3N6r0MUK3nXawp4i00FUdhAfH7', {apiVersion: '2023-10-16'})

  async checkout(product, email: string) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card', 'boleto'],
        line_items: [{
          price: this.getProductType(product).price,
          quantity: 1,
        }],
        mode: 'payment',
        /* discounts: [{
          coupon: 's1EuRkrQ'&&'slPhY5mI',
        }], */
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });
      await this.orderService.create(email)
      const data = await this.authService.findByEmail(email)
      return {'url': session.url, 'id': session.id, 'price':  `R$${(session.amount_total/100).toFixed(2).replace('.', ',')}`, 'description': this.getProductDescription(product), 'name': this.getProductType(product).name, 'client_data': data}
    } catch (error) {
      console.error(error)
      throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  private getProductType(type: Products) {
    let price  = ''
    let name = ''
    if (type == Products.FULL_UPGRADE) {
      price = 'price_1OLgmcAtJK3MHkH3c4AD35lT'
      name = 'Full Upgrade de Conta'
    }
    else if(type == Products.MONEY_100M) {
      price = 'price_1OOBvKAtJK3MHkH3LaTo5HGr'
      name = '100 Milhões'
    }
    else if(type == Products.MONEY_700M) {
      price = 'price_1OOC4pAtJK3MHkH3qXiOCUex'
      name = '700 Milhões'
    }
    else if(type == Products.MONEY_1B) {
      price = 'price_1OOCDgAtJK3MHkH3SEk3tKBh'
      name = '1 Bilhão'
    }
    else if(type == Products.UNLOCK_ALL) {
      price = 'price_1OOCFdAtJK3MHkH33Mzpb4j0'
      name = 'Unlock All'
    }
    else if(type == Products.LEVEL_UP_500) {
      price = 'price_1OOCI5AtJK3MHkH3BX2Xx413'
      name = 'Up Até Nível 500'
    }
    else if(type == Products.PACOTE_1B) {
      price = 'price_1OOCDgAtJK3MHkH3SEk3tKBh',
      name = 'Pacote 1 Bilhão'
    }
    else if(type == Products.PACOTE_3B) {
      price = 'price_1OOCK0AtJK3MHkH3wlQrNPcm'
      name = 'Pacote 1 Bilhão'
    }
    else if(type == Products.PACOTE_6B) {
      price = 'price_1OOCMGAtJK3MHkH3799Xkp5s'
      name = 'Pacote 1 Bilhão'
    }
    else if(type == Products.PACOTE_10B) {
      price = 'price_1OOCNNAtJK3MHkH3QXUhWtDi'
      name = 'Pacote 1 Bilhão'
    }
    else if(type == Products.PACOTE_15B) {
      price = 'price_1OOCDgAtJK3MHkH3SEk3tKBh'
      name = 'Pacote 1 Bilhão'
    }
    else if(type == Products.TRAJES_MOD_20) {
      price = 'price_1OOCDgAtJK3MHkH3SEk3tKBh'
      name = 'Pacote 1 Bilhão'
    }

    return {'price': price, 'name': name}
  }

  private getProductDescription(type: Products): string {
    let price  = ''
    let description = ''
    if (type == Products.FULL_UPGRADE) {
      price = 'price_1OLgmcAtJK3MHkH3c4AD35lT'
      description = '- 5 Bilhões\n- Estatísticas no Máximo\n- Conquistas Desbloqueadas\n- Roupas Desbloqueadas\n- Tatuagens Desbloqueadas\n- Mascaras Desbloqueadas\n- Pinturas Desbloqueadas\n- Troca de Sexo no Menu Desbloqueadas\n- 10 Carros Mod'
    }
    else if(type == Products.MONEY_100M) {
      price = 'price_1OOBvKAtJK3MHkH3LaTo5HGr',
      description = '- 100 milhões na sua conta do GTA V Online'
    }
    else if(type == Products.MONEY_700M) {
      price = 'price_1OOC4pAtJK3MHkH3qXiOCUex'
      description = '- 700 milhões na sua conta do GTA V Online'
    }
    else if(type == Products.MONEY_1B) {
      price = 'price_1OOCDgAtJK3MHkH3SEk3tKBh'
      description = '- 1 bilhão na sua conta do GTA V Online'
    }
    else if(type == Products.UNLOCK_ALL) {
      price = 'price_1OOCFdAtJK3MHkH33Mzpb4j0'
      description = '- Estatísticas no Máximo\n- Conquistas Desbloqueadas\n- Roupas Desbloqueadas\n- Tatuagens Desbloqueadas\n- Mascaras Desbloqueadas\n- Pinturas Desbloqueadas'
    }
    else if(type == Products.LEVEL_UP_500) {
      price = 'price_1OOCI5AtJK3MHkH3BX2Xx413'
      description = '- Sua conta upada no nível 500'
    }
    else if(type == Products.PACOTE_1B) {
      price = 'price_1OOCDgAtJK3MHkH3SEk3tKBh'
      description = '- 1 Bilhão na sua conta do GTA V Online\n- 10 Trajes Mod \n Unlock All'
    }
    else if(type == Products.PACOTE_3B) {
      price = 'price_1OOCK0AtJK3MHkH3wlQrNPcm'
      description = '- 3 Bilhões na sua conta do GTA V Online\n- 10 Trajes Mod \n Unlock All'
    }
    else if(type == Products.PACOTE_6B) {
      price = 'price_1OOCMGAtJK3MHkH3799Xkp5s'
      description = '- 6 Bilhões na sua conta do GTA V Online\n- 10 Trajes Mod \n Unlock All'
    }
    else if(type == Products.PACOTE_10B) {
      price = 'price_1OOCNNAtJK3MHkH3QXUhWtDi'
      description = '- 10 Bilhões na sua conta do GTA V Online\n- 10 Trajes Mod \n Unlock All'
    }
    else if(type == Products.PACOTE_15B) {
      price = 'price_1OOCDgAtJK3MHkH3SEk3tKBh'
      description = '- 15 Bilhões na sua conta do GTA V Online\n- 10 Trajes Mod \n Unlock All'
    }
    else if(type == Products.TRAJES_MOD_20) {
      price = 'price_1OOCDgAtJK3MHkH3SEk3tKBh'
      description = '- 20 Trajes Mod à sua escolha'
    }

    return description
  }

}
