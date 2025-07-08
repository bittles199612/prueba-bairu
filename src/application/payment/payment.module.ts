import { Module } from '@nestjs/common';
import { CustomerController } from './controller/customer.controller';
import { PriceController } from './controller/price.controller';
import { ProductoController } from './controller/productos.controller';
import { SubscribeController } from './controller/subscribe.controller';
import { CustomerService } from './service/cutomer.service';
import { PagoService } from './service/pago.service';
import { PriceService } from './service/price.service';
import { ProductosService } from './service/productos.service';
import { SubscribeService } from './service/subscribe.service';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from '@/core/external-service/stripe/stripe.module';

@Module({
  controllers: [
    CustomerController,
    PriceController,
    ProductoController,
    SubscribeController,
  ],
  providers: [
    CustomerService,
    PagoService,
    PriceService,
    ProductosService,
    SubscribeService,
  ],
  imports: [ConfigModule, StripeModule],
})
export class PaymentModule {}
