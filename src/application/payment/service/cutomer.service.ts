import { StripeType } from '@/common/constant';
import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { CrearCustomer } from '../dto/crear-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(StripeType.STRIPE_CLIENT) private readonly stripe: Stripe,
  ) {}

  async listar() {
    return await this.stripe.customers.list({
      limit: 10,
    });
  }

  async intentosCustomer(idCustomer: string) {
    const invoices = await this.stripe.invoices.list({
      customer: idCustomer,
      limit: 100,
    });
    return invoices;
  }

  async crear(customerDto: CrearCustomer) {
    try {
      return await this.stripe.customers.create({
        name: customerDto.email,
        email: customerDto.email,
      });
    } catch (error) {
      if (error instanceof Error)
        throw new PreconditionFailedException(error.message || error);
    }
  }
}
