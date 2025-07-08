import { StripeType } from '@/common/constant';
import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { CrearProductoDto } from '../dto/crear-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @Inject(StripeType.STRIPE_CLIENT) private readonly stripe: Stripe,
  ) {}

  async listar() {
    return await this.stripe.products.list({
      limit: 100,
      active: true,
    });
  }

  async create(productoDto: CrearProductoDto) {
    try {
      return await this.stripe.products.create(productoDto);
    } catch (error) {
      if (error instanceof Error)
        throw new PreconditionFailedException(error.message || error);
    }
  }

  async buscarProducto(id: string) {
    return await this.stripe.products.retrieve(id);
  }
}
