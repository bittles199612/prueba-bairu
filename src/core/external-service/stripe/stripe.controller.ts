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
import { Request as ExpressRequest } from 'express';

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
  stripeWebhook(
    @Req() req: RawBodyRequest<ExpressRequest>,
    // @Req() req: ExpressRequest,
    @Headers('stripe-signature') sig: string,
  ) {
    return this.stripeService.webhook(req, sig);
  }
}

// @Post('webhook')
// stripeWebhook(
//   @Body() body: any,
//   // @Headers('stripe-signature') sig: string,
// ) {
//   return this.stripeService.webhook(body);
// }
