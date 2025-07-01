import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { StriperService } from './stripe.service';
import { CrearCustomer, CrearStripe } from './stripe.dto';
import Stripe from 'stripe';
import { ParamIdDto } from '@/common/dto/param.dto';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StriperService,
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
  ) {}

  @Post()
  async crearPago(@Body() pagoDto: CrearStripe) {
    return await this.stripeService.createSesion(pagoDto);
  }

  @Get('success')
  success(@Res() res: Response) {
    console.log('-----------------success');
  }

  @Get('cancel')
  cancel(@Res() res: Response) {
    console.log(res, '-----------------cancel');
  }

  @Get('consultar-subscripcion/:id')
  async cosultarSubscripcion(@Param() param: ParamIdDto) {
    const { id: idSubscripcion } = param;
    return await this.stripe.subscriptions.retrieve(idSubscripcion);
  }

  @Get('ver-detalle/:id')
  async detalleCustomer(@Param() param: ParamIdDto) {
    const { id: idSubscripcion } = param;
    const session = await this.stripe.billingPortal.sessions.create({
      customer: idSubscripcion,
      return_url: 'http://localhost:3000/perfil',
    });
    return session;
  }

  @Get('intentos-customer/:id')
  async intentosCustomer(@Param() param: ParamIdDto) {
    const { id: idCustomer } = param;
    const invoices = await this.stripe.invoices.list({
      customer: idCustomer,
      limit: 100,
    });
    return invoices;
  }

  @Post('cancelar-subscripcion/:id')
  async cancelarSubscripcion(@Param() param: ParamIdDto) {
    const { id: idSubscripcion } = param;
    return await this.stripe.subscriptions.update(idSubscripcion, {
      cancel_at_period_end: true,
    });
  }

  @Post('cancelar-subscripcion-inmediata/:id')
  async cancelarSubscripcionInmediata(@Param() param: ParamIdDto) {
    const { id: idSubscripcion } = param;
    return await this.stripe.subscriptions.update(idSubscripcion);
  }

  @Post('reactivar-subscripcion/:id')
  async reactivarSubscripcion(@Param() param: ParamIdDto) {
    const { id: idSubscripcion } = param;
    return await this.stripe.subscriptions.update(idSubscripcion, {
      cancel_at_period_end: false,
    });
  }

  // @Post('pausar-subscripcion-temporal/:id')
  // async pausarSubscripcionTemporal(@Param() param: ParamIdDto) {
  //   const { id: idSubscripcion } = param;
  //   return await this.stripe.subscriptions.update(idSubscripcion, {
  //     pause_collection: {
  //       behavior: '',
  //     },
  //   });
  // }

  @Post('crear-customer')
  async crearUsuario(@Body() customerDto: CrearCustomer) {
    return await this.stripe.customers.create(customerDto);
  }

  @Post('webhook')
  stripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    const rawBody = req.rawBody;

    if (!rawBody) {
      console.log('NO EXISTE');
      return 'Raw body is missing';
    }

    try {
      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || '',
        50000000,
      );
      // TODO para produccion no deberia ponerse este tiempo en segundo se debe configurar bien s
      console.log('EVENT:', event.type);
      const session = event.data.object as Stripe.Checkout.Session;

      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('✅ Pago exitoso', event.type);
          console.log(
            '-----------------------------------------------------------',
          );
          break;
        case 'customer.subscription.created':
          console.log('✅ Subscripción creada', event.type);
          console.log(
            '-----------------------------------------------------------',
          );
          break;
        case 'checkout.session.completed':
          console.log('✅ Checkout finalizado', event.type);
          console.log('Subscripcion ID:', session.subscription);
          console.log('Subscripcion ID:', session.customer);

          console.log(
            '-----------------------------------------------------------',
          );
          break;
        case 'customer.subscription.deleted':
          console.log('✅ Subscripcion cancelada');
          console.log(
            '-----------------------------------------------------------',
          );
          break;
        case 'invoice.payment_failed':
          console.log('invoice.payment_failed', event.type);
          console.log(
            '-----------------------------------------------------------',
          );
          break;
        default:
          console.log(`Evento no manejado: ${event.type}`);
      }

      return 'Received';
    } catch (error) {
      console.error('Webhook error:', error);
      return `Webhook Error: ${error}`;
    }
  }
}
