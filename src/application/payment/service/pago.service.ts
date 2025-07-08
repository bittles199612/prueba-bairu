import { StripeType } from '@/common/constant';
import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PagoService {
  constructor(
    @Inject(StripeType.STRIPE_CLIENT) private readonly stripe: Stripe,
  ) {}

  async buscarPorId(idCustomer: string) {
    return await this.stripe.paymentIntents.list({
      customer: idCustomer,
      limit: 10,
    });
  }
}
