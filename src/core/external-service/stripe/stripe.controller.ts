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
import Stripe from 'stripe';
import { ParamIdDto } from '@/common/dto/param.dto';
import { CrearStripe } from './stripe.dto';

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
    console.log('✅-----------------success-----------------');
  }

  @Get('cancel')
  cancel(@Res() res: Response) {
    console.log('❌--------------cancelado--------------');
  }

  @Get('detalles/:id')
  async detalleCustomer(@Param() param: ParamIdDto) {
    const { id: idSubscripcion } = param;
    const session = await this.stripe.billingPortal.sessions.create({
      customer: idSubscripcion,
      return_url: 'http://localhost:3000/perfil',
    });
    return session;
  }

  @Post('portal-url/:id')
  async mostrarPortal(@Param() param: ParamIdDto) {
    const { id: idPorta } = param;
    const resp = await this.stripe.billingPortal.sessions.create({
      customer: idPorta,
      return_url: 'http://localhost:8080/perfil',
    });
    return { url: resp.url };
  }

  @Get('pago/:id')
  async mostrarPagos(@Param() params: ParamIdDto) {
    const { id: idPago } = params;
    return await this.stripe.paymentIntents.list({
      customer: idPago,
      limit: 10,
    });
  }

  @Get('subscripcion/data/:id')
  async diaPago(@Param() params: ParamIdDto) {
    const { id: idSubscripcion } = params;
    return await this.stripe.subscriptions.retrieve(idSubscripcion);
  }

  @Get('/invoice/detail/:id')
  async verInvoice(@Param() params: ParamIdDto) {
    const { id: idInvoice } = params;
    return await this.stripe.invoices.retrieve(idInvoice);
  }

  @Post('webhook')
  async stripeWebhook(
    @Headers('stripe-signature') sig: string,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    return await this.stripeService.webhook(req, sig, res);

    // const rawBody = req.rawBody;

    // if (!rawBody) {
    //   console.log('NO EXISTE');
    //   return 'Raw body is missing';
    // }

    // try {
    //   const event = this.stripe.webhooks.constructEvent(
    //     rawBody,
    //     signature,
    //     process.env.STRIPE_WEBHOOK_SECRET || '',
    //     50000000,
    //   );
    //   console.log('EVENTOOOO:', event.type, '********************************');
    //   const session = event.data.object as Stripe.Checkout.Session;
    //   const subscription = event.data.object as Stripe.Subscription;
    //   const invoice = event.data.object as Stripe.Invoice;
    //   let currentPriceId;
    //   if (subscription.items && subscription.items.data)
    //     currentPriceId = subscription.items.data[0].price.id;
    //   const previous = event.data.previous_attributes as {
    //     items?: Array<{
    //       price?: {
    //         id?: string;
    //       };
    //     }>;
    //   };

    //   let eventoWebhook:
    //     | Stripe.Checkout.Session
    //     | Stripe.Subscription
    //     | Stripe.Invoice;
    //   switch (event.type) {
    //     case 'checkout.session.completed': {
    //       eventoWebhook = event.data.object;
    //       // console.log('SUB desde session:', session.subscription);
    //       this.stripeService.transaccion(eventoWebhook, event);
    //       break;
    //     }
    //     //  as Stripe.Checkout.Session
    //     case 'customer.subscription.created':
    //     case 'customer.subscription.updated':
    //     case 'customer.subscription.deleted': {
    //       eventoWebhook = event.data.object;
    //       // console.log('SUB desde subscription: ', subscription);
    //       this.stripeService.transaccion(eventoWebhook, event);
    //       break;
    //     }

    //     case 'invoice.paid':
    //     case 'invoice.created':
    //     case 'invoice.finalized': {
    //       eventoWebhook = event.data.object;
    //       this.stripeService.transaccion(eventoWebhook, event);
    //       // console.log('SUB desde invoice:', invoice);
    //       break;
    //     }

    //     default:
    //       console.log('Evento no manejado', event.type);
    //   }

    //   // console.log(
    //   //   '📦 Subscripcion SUBSCRIPTION ID: 🔑',
    //   //   eventoWebhook.id ? eventoWebhook.id : 'No disponible',
    //   // );
    //   // console.log(
    //   //   '👤 Subscripcion CUSTOMER ID: 🔑',
    //   //   session.customer ? session.customer : 'No disponible',
    //   // );
    //   // console.log('EVENTO INICIO ******************', event.type);

    //   // switch (event.type) {
    //   //   case 'payment_intent.succeeded':
    //   //     console.log('✅ Pago exitoso', event.type);
    //   //     console.log('🔍 EVENT:	', event.type);
    //   //     console.log(
    //   //       '-----------------------------------------------------------',
    //   //     );
    //   //     break;
    //   //   case 'customer.subscription.created':
    //   //     console.log('✅ Subscripción creada 📬', event.type);
    //   //     console.log('🔍 EVENT:	', event.type);
    //   //     console.log(
    //   //       '-----------------------------------------------------------',
    //   //     );
    //   //     break;
    //   //   case 'checkout.session.completed':
    //   //     console.log('✅ Checkout finalizado', event.type);
    //   //     console.log('🔍 EVENT:	', event.type);
    //   //     console.log(
    //   //       '-----------------------------------------------------------',
    //   //     );
    //   //     break;
    //   //   case 'customer.subscription.deleted':
    //   //     console.log('✅ Subscripcion cancelada');
    //   //     console.log('🔍 EVENT:	', event.type);
    //   //     console.log(
    //   //       '-----------------------------------------------------------',
    //   //     );
    //   //     break;
    //   //   case 'customer.subscription.updated':
    //   //     console.log('✅ Subscripcion updated');
    //   //     console.log('🔍 EVENT:	', event.type);
    //   //     if (previous && previous !== currentPriceId) {
    //   //       console.log(
    //   //         '✅ 🔁El usuario cambio de plan:',
    //   //         previous,
    //   //         '-',
    //   //         currentPriceId,
    //   //       );
    //   //     }
    //   //     if (subscription.cancel_at_period_end) {
    //   //       console.log(
    //   //         'el cliente ha prograamado la cancelacion al final del periodo',
    //   //       );
    //   //       console.log('EVENTOOooooooo', event);
    //   //     } else if (subscription.cancel_at) {
    //   //       console.log('subscripcion cancelada inmediatamante');
    //   //     }

    //   //     if (invoice.billing_reason === 'subscription_cycle') {
    //   //       console.log('🧾 RENOVACION: factura creada para la renovacion ');
    //   //     }
    //   //     console.log(
    //   //       '-----------------------------------------------------------',
    //   //     );
    //   //     break;
    //   //   case 'invoice.payment_failed':
    //   //     console.log('🧾 invoice.payment_failed', event.type);
    //   //     console.log('🔍 EVENT:	', event.type);
    //   //     console.log(
    //   //       '-----------------------------------------------------------',
    //   //     );
    //   //     break;

    //   //   case 'invoice.created':
    //   //     console.log('🧾 STATUS: CREATE Factura creada con exito 	☑️');
    //   //     console.log('🔍 EVENT:	', event.type);
    //   //     console.log('----------------------------------------------------');
    //   //     break;
    //   //   case 'invoice.finalized':
    //   //     console.log(
    //   //       '🧾  STATUS: FINALIZE factuara ha sido cerrada fianlizada 	☑️',
    //   //     );
    //   //     console.log('🔍 EVENT:	', event.type);
    //   //     console.log('----------------------------------------------------');
    //   //     break;
    //   //   case 'invoice.paid':
    //   //     console.log('🧾 STATUS: PAID pagado exitosamente 	☑️');
    //   //     console.log('🔍 EVENT:	', event.type);
    //   //     console.log('----------------------------------------------------');
    //   //     break;
    //   //   default:
    //   //     console.log(`Evento no manejado: ${event.type}`);
    //   //     console.log('🔍 EVENT:	', event.type);
    //   // }

    //   return 'Received';
    // } catch (error) {
    //   console.error('Webhook error:', error);
    //   return `Webhook Error: ${error}`;
    // }
  }
}
// Subscripcion SUBSCRIPTION ID 🔐📦: undefined
// Subscripcion CUSTOMER ID 🔐👤: cus_SbibDVFH5v3Ztp
// Evento no manejado: invoice.created
// Subscripcion SUBSCRIPTION ID 🔐📦: undefined
// Subscripcion CUSTOMER ID 🔐👤: cus_SbibDVFH5v3Ztp
// Evento no manejado: invoice.finalized
// Subscripcion SUBSCRIPTION ID 🔐📦: undefined
// Subscripcion CUSTOMER ID 🔐👤: cus_SbibDVFH5v3Ztp
// Evento no manejado: invoice.paid
// Subscripcion SUBSCRIPTION ID 🔐📦: undefined
// Subscripcion CUSTOMER ID 🔐👤: cus_SbibDVFH5v3Ztp
// Evento no manejado: invoice.payment_succeeded
// ✅-----------------success-----------------
