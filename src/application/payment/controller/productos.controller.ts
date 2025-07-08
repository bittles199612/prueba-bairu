import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductosService } from '../service/productos.service';
import { CrearProductoDto } from '../dto/crear-producto.dto';

@Controller('products')
export class ProductoController {
  constructor(private readonly productoService: ProductosService) {}

  @Get()
  async listar() {
    return await this.productoService.listar();
  }

  @Post()
  async crear(@Body() body: CrearProductoDto) {
    return await this.productoService.create(body);
  }
}
