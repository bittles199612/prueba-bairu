import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { StriperService } from './stripe.service';
import { CrearStripe } from './stripe.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly striperService: StriperService) {}

  @Post()
  async crearPago(@Body() pagoDto: CrearStripe) {
    return await this.striperService.createSesion(pagoDto);
  }

  @Get('success')
  success(@Res() res: Response) {
    console.log(res, '-----------------success');
  }

  @Get('cancel')
  cancel(@Res() res: Response) {
    console.log(res, '-----------------cancel');
  }
}
