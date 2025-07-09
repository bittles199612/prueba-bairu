import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { CrearStripe } from './stripe.dto';
import { ModoPago } from './constant';
import { ConfigService } from '@nestjs/config';
import { Messages } from '@/common/constant/response-mensaje';

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
  // RawBodyRequest<Request>
  webhook(req: Request & { rawBody: Buffer }, sig: string) {
    let event: Stripe.Event | undefined;

    const rawBody = req.rawBody;

    try {
      if (!rawBody) throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
      console.log('✅ rawBody recibido', typeof rawBody);
      console.log('🔐 Firma:', sig);
      console.log('🔐 Firma:', process.env.STRIPE_WEBHOOK_SECRET);

      event = this.stripe.webhooks.constructEvent(
        rawBody,
        sig ?? '',
        process.env.STRIPE_WEBHOOK_SECRET || '',
        50000000,
      );
      console.log('PASO -------------------------');
    } catch (error) {
      const dataError = error as Error;
      if (dataError) {
        throw new PreconditionFailedException(dataError.message || error);
      }
    }

    if (!event) {
      throw new InternalServerErrorException(
        'Evento no fure creado correctamente.',
      );
    }

    const previous = event.data.previous_attributes as {
      items?: Array<{
        price?: {
          id?: string;
        };
      }>;
    };

    const subscription = event.data.object as Stripe.Subscription;
    const invoice = event.data.object as Stripe.Invoice;
    let currentPriceId;
    console.log('EVENT: Tipo de evento', event.type);
    if (subscription.items && subscription.items.data)
      currentPriceId = subscription.items.data[0].price.id;

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('✅ Pago exitoso', event.type);
        console.log('🔍 EVENT:	', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'checkout.session.completed':
        console.log('✅ Checkout finalizado', event.type);
        console.log('🔍 EVENT:	', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'customer.created':
        console.log('👤 Customer creada ✅', event.type);
        console.log('🔍 EVENT: ', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'customer.source.expiring':
        console.log(
          '👤 Ocurre cuando un tarjeta o fuente expira al final de mes ⏳',
          event.type,
        );
        console.log('🔍 EVENT:	', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'customer.subscription.paused':
        console.log(
          '👤 Ocurre cuando una subscriocion de un customer es pausado ⏹',
          event.type,
        );
        console.log('🔍 EVENT:	', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'customer.subscription.created':
        console.log('👤 customer.subscription.created ✅', event.type);
        console.log('🔍 EVENT:	', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'customer.subscription.deleted':
        console.log('👤 customer.subscription.deleted ❌');
        console.log('🔍 EVENT:	', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'invoice_payment.paid':
        console.log('🧾 invoice_payment.paid ✅');
        console.log('🔍 EVENT:	', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'invoice.payment_failed':
        console.log('🧾 invoice.payment_failed ❌', event.type);
        console.log('🔍 EVENT:	', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'invoice.deleted':
        console.log('🧾 Un borrador de factura es eliminado. ❌', event.type);
        console.log('🔍 EVENT:	', event.type);
        console.log(
          '-----------------------------------------------------------',
        );
        break;
      case 'invoice.created':
        console.log('🧾 STATUS: CREATE Factura creada con exito ✅');
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'invoice.finalized':
        console.log(
          '🧾 STATUS: FINALIZE factuara ha sido cerrada fianlizada ✅',
        );
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'invoice.paid':
        console.log('🧾 STATUS: PAID pagado exitosamente ✅');
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'invoice.payment_succeeded':
        console.log('🧾 STATUS: PAID el pago fue exioso ✅');
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'invoiceitem.created':
        console.log('🧾 STATUS: Se creo un item de factura individual ✅');
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'payment_intent.canceled':
        console.log('🧾 STATUS: Un pago se cancela ✅');
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'payment_intent.created':
        console.log('💵 STATUS: Un pago se es creado ✅');
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'payment_intent.partially_funded':
        console.log(
          '💵 STATUS: ocure cuando son aplicados fondos a un customer balance ✅',
        );
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'payment_intent.payment_failed':
        console.log(
          '💵 STATUS: ocurre cuando un pago a fallado un intento de metodo de pago o pago ❌',
        );
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'payment_intent.processing':
        console.log('💵 STATUS: ocurre cuando ha empezado el proceso ⏳✅');
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'payment_intent.requires_action':
        console.log('💵 STATUS: ocurre cuando un intento de pago 🔁');
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'subscription_schedule.aborted':
        console.log(
          '➕ STATUS: ocurre cuando un una subscripcion es cancelada debido a una mora 🚫',
        );
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'subscription_schedule.canceled':
        console.log(
          '➕ STATUS: ocurre cuando un una subscripcion es cancelada 🚫',
        );
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'subscription_schedule.completed':
        console.log(
          '➕ STATUS: ocurre cuando una subscripcion es cancelada 🚫',
        );
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'subscription_schedule.created':
        console.log(
          '➕ STATUS: ocurre cuando una subscripcion es es creado ✅',
        );
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'subscription_schedule.expiring':
        console.log(
          '➕ STATUS: ocurre cuando 7 dias antes que una sbuscripcion expirara ⏳',
        );
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'subscription_schedule.released':
        console.log(
          '➕ STATUS: ocurre cuando una subscripcion es publicada ✅',
        );
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'subscription_schedule.updated':
        console.log('➕ STATUS: ocurre cuando es actulaizada ✅');
        console.log('🔍 EVENT:	', event.type);
        console.log('----------------------------------------------------');
        break;
      case 'setup_intent.created':
        console.log('🔍 EVENT:	', event.type);
        console.log('setupIntent creado:  🔑', event.data.object.id);
        console.log('----------------------------------------------------');
        break;
      case 'setup_intent.setup_failed':
        console.log('🔍 EVENT:	', event.type);
        console.log('setupIntent FALLO:  🔑', event.data.object.id);
        console.log('----------------------------------------------------');
        break;
      case 'customer.subscription.updated':
        console.log('✅ customer.subscription.updated');
        console.log('🔍 EVENT:	', event.type);
        if (previous && previous !== currentPriceId) {
          console.log(
            '👤 🔁 El usuario cambio de plan ✅: ',
            previous,
            '-',
            currentPriceId,
          );
        }
        if (subscription.cancel_at_period_end) {
          console.log(
            '👤 El cliente ha prograamado la cancelacion al final del periodo ✅',
          );
        } else if (subscription.cancel_at) {
          console.log('➕ subscripcion cancelada inmediatamante');
        }

        if (invoice.billing_reason === 'subscription_cycle') {
          console.log('🧾 RENOVACION: factura creada para la renovacion ✅');
        }
        console.log('----------------------------------------------------');
        break;
      default:
        console.log(`🔔 Evento no manejado: ${event.type}`);
        console.log('🔍 EVENT:	', event.type);
    }
    return true;
    // const session = event.data.object as Stripe.Checkout.Session
  }

  // transaccion(
  //   data: Stripe.Checkout.Session | Stripe.Subscription | Stripe.Invoice,
  //   event: Stripe.Event,
  // ) {
  //   console.log(data.id);
  //   const session = event.data.object as Stripe.Checkout.Session;

  //   console.log(
  //     '📦 Subscripcion SUBSCRIPTION ID: 🔑',
  //     data.id ? data.id : 'No disponible',
  //     event.type,
  //   );
  //   console.log(
  //     '👤 Subscripcion CUSTOMER ID: 🔑',
  //     session.customer ? session.customer : 'No disponible',
  //   );
  //   console.log('EVENTO INICIO ******************', event.type);

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

  //   switch (event.type) {
  //     case 'payment_intent.succeeded':
  //       console.log('✅ Pago exitoso', event.type);
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log(
  //         '-----------------------------------------------------------',
  //       );
  //       break;
  //     case 'customer.subscription.created':
  //       console.log('✅ Subscripción creada 📬', event.type);
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log(
  //         '-----------------------------------------------------------',
  //       );
  //       break;
  //     case 'checkout.session.completed':
  //       console.log('✅ Checkout finalizado', event.type);
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log(
  //         '-----------------------------------------------------------',
  //       );
  //       break;
  //     case 'customer.subscription.deleted':
  //       console.log('✅ Subscripcion cancelada');
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log(
  //         '-----------------------------------------------------------',
  //       );
  //       break;
  //     case 'customer.subscription.updated':
  //       console.log('✅ Subscripcion updated');
  //       console.log('🔍 EVENT:	', event.type);
  //       if (previous && previous !== currentPriceId) {
  //         console.log(
  //           '✅ 🔁El usuario cambio de plan:',
  //           previous,
  //           '-',
  //           currentPriceId,
  //         );
  //       }
  //       if (subscription.cancel_at_period_end) {
  //         console.log(
  //           'el cliente ha prograamado la cancelacion al final del periodo',
  //         );
  //       } else if (subscription.cancel_at) {
  //         console.log('subscripcion cancelada inmediatamante');
  //       }

  //       if (invoice.billing_reason === 'subscription_cycle') {
  //         console.log('🧾 RENOVACION: factura creada para la renovacion ');
  //       }
  //       console.log(
  //         '-----------------------------------------------------------',
  //       );
  //       break;
  //     case 'invoice.payment_failed':
  //       console.log('🧾 invoice.payment_failed', event.type);
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log(
  //         '-----------------------------------------------------------',
  //       );
  //       break;

  //     case 'invoice.created':
  //       console.log('🧾 STATUS: CREATE Factura creada con exito 	☑️');
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log('----------------------------------------------------');
  //       break;
  //     case 'invoice.finalized':
  //       console.log(
  //         '🧾  STATUS: FINALIZE factuara ha sido cerrada fianlizada 	☑️',
  //       );
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log('----------------------------------------------------');
  //       break;
  //     case 'invoice.paid':
  //       console.log('🧾 STATUS: PAID pagado exitosamente 	☑️');
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log('----------------------------------------------------');
  //       break;
  //     case 'invoice.payment_succeeded':
  //       console.log('🧾 STATUS: PAID el pago fue exioso 	☑️');
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log('----------------------------------------------------');
  //       break;
  //     case 'invoiceitem.created':
  //       console.log('🧾 STATUS: Se creo un item de factura individual');
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log('----------------------------------------------------');
  //       break;
  //     case 'setup_intent.created':
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log('setupIntent creado:  🔑', event.data.object.id);
  //       console.log('----------------------------------------------------');
  //       break;
  //     case 'setup_intent.setup_failed':
  //       console.log('🔍 EVENT:	', event.type);
  //       console.log('setupIntent FALLO:  🔑', event.data.object.id);
  //       console.log('----------------------------------------------------');
  //       break;
  //     default:
  //       console.log(`Evento no manejado: ${event.type}`);
  //       console.log('🔍 EVENT:	', event.type);
  //   }
  // }
}
