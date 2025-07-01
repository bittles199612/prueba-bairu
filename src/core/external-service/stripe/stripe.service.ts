import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { CrearStripe } from './stripe.dto';
import { ModoPago } from './constant';
import { ConfigService } from '@nestjs/config';

dotenv.config();

@Injectable()
export class StriperService {
  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
    private readonly configService: ConfigService,
  ) {}

  async createSesion(data: CrearStripe) {
    try {
      return await this.stripe.checkout.sessions.create({
        line_items: data.lineItems,
        customer: data.customer,
        mode: data.mode === ModoPago.PAYMENT ? 'payment' : 'subscription',
        success_url: this.configService.get<string>('STRIPE_SUCCESS_URL'),
        cancel_url: this.configService.get<string>('STRIPE_CANCEL_URL'),
      });
    } catch (error) {
      throw new PreconditionFailedException(error);
    }
  }

  verify(
    payload: string | Buffer,
    signature: string | string[],
    secret: string,
  ) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        secret,
      );
      return event;
    } catch (error) {
      throw new PreconditionFailedException(error);
    }
  }
}
