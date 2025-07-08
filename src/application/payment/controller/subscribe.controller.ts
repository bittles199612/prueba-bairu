import { ParamIdDto } from '@/common/dto/param.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubscribeService } from '../service/subscribe.service';
import { StriperService } from '@/core/external-service/stripe/stripe.service';
import { CrearStripe } from '@/core/external-service/stripe/stripe.dto';

@Controller('subscripcions')
export class SubscribeController {
  constructor(
    private readonly subscribeService: SubscribeService,
    private readonly striveService: StriperService,
  ) {}

  @Get('/:id')
  async buscar(@Param() params: ParamIdDto) {
    const { id: idSubscribe } = params;
    return await this.subscribeService.buscarSubscripcionPorId(idSubscribe);
  }

  @Get('cancelacion/:id')
  async cancelar(@Param() param: ParamIdDto) {
    const { id: idCustomer } = param;
    return await this.subscribeService.cancelarSubscripcion(idCustomer);
  }

  @Get('/:id/cancelacion-inmediata')
  async cancelarInmediata(@Param() param: ParamIdDto) {
    const { id: idCustomer } = param;
    return await this.subscribeService.cancelarSubscripcionInmediata(
      idCustomer,
    );
  }

  @Get('/:id/reactivacion')
  async reactivacion(@Body() param: ParamIdDto) {
    const { id: idCustomer } = param;
    return await this.subscribeService.reactivarSubscripcion(idCustomer);
  }

  @Post()
  async crearPago(@Body() pagoDto: CrearStripe) {
    return await this.striveService.createSesion(pagoDto);
  }
}
