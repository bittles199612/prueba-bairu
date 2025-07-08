import { ParamIdDto } from '@/common/dto/param.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from '../service/cutomer.service';
import { CrearCustomer } from '../dto/crear-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async listar() {
    return await this.customerService.listar();
  }

  @Get('/:id')
  async intentosCustomer(@Param() param: ParamIdDto) {
    const { id: idCustomer } = param;
    return await this.customerService.intentosCustomer(idCustomer);
  }

  @Post()
  async crear(@Body() body: CrearCustomer) {
    return await this.customerService.crear(body);
  }
}
