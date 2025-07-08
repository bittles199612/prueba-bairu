import {
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { CrearPriceDto } from '../dto/crear-price.dto';
import { ProductosService } from './productos.service';
import { Messages } from '@/common/constant/response-mensaje';

@Injectable()
export class PriceService {
  constructor(
    @Inject('STRIPE_CLIENT')
    private readonly stripe: Stripe,
    private readonly productoService: ProductosService,
  ) {}

  async listar() {
    return await this.stripe.prices.list();
  }

  async crear(producto: CrearPriceDto) {
    try {
      const data = await this.productoService.buscarProducto(producto.product);
      if (!data)
        throw new NotFoundException(Messages.EXCEPTION_PRODUCTO_NOT_FOUND);

      return await this.stripe.prices.create({
        unit_amount: producto.unit_amount,
        currency: producto.currency,
        recurring: producto.recurring,
        product: producto.product,
      });
    } catch (error) {
      if (error instanceof Error)
        throw new PreconditionFailedException(error.message || error);
    }
  }

  async buscarPorId(id: string) {
    try {
      return await this.stripe.prices.retrieve(id);
    } catch (error) {
      if (error instanceof Error)
        throw new PreconditionFailedException(error.message || error);
    }
  }
}
