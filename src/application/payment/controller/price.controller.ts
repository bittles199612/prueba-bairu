import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PriceService } from '../service/price.service';
import { CrearPriceDto } from '../dto/crear-price.dto';
import { ParamIdDto } from '@/common/dto/param.dto';

@Controller('prices')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async list() {
    return await this.priceService.listar();
  }

  @Get('/:id')
  async buscarPrice(@Param() param: ParamIdDto) {
    const { id: idPrice } = param;
    return await this.priceService.buscarPorId(idPrice);
  }

  @Post()
  async crear(@Body() body: CrearPriceDto) {
    return await this.priceService.crear(body);
  }
}
