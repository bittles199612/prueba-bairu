import { StripeType } from '@/common/constant';
import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class SubscribeService {
  constructor(
    @Inject(StripeType.STRIPE_CLIENT) private readonly stripe: Stripe,
  ) {}

  async buscarSubscripcionPorId(id: string) {
    return await this.stripe.subscriptions.retrieve(id, {
      expand: ['items.data.price.product'],
    });
  }

  async cancelarSubscripcion(id: string) {
    try {
      return await this.stripe.subscriptions.update(id, {
        cancel_at_period_end: true,
      });
    } catch (error) {
      if (error instanceof Error)
        throw new PreconditionFailedException(error.message || error);
    }
  }

  async cancelarSubscripcionInmediata(id: string) {
    try {
      return await this.stripe.subscriptions.update(id);
    } catch (error) {
      if (error instanceof Error)
        throw new PreconditionFailedException(error.message || error);
    }
  }

  async reactivarSubscripcion(id: string) {
    try {
      return await this.stripe.subscriptions.update(id, {
        cancel_at_period_end: false,
      });
    } catch (error) {
      if (error instanceof Error)
        throw new PreconditionFailedException(error.message || error);
    }
  }
}
