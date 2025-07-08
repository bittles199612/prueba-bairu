// import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
// import { Request } from 'express';
// import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { ParamIdDto } from '@/common/dto/param.dto';
// import { CrearPersonaDto } from '../dto/crear-persona.dto';

// @ApiTags('Persona')
// @Controller('persona')
// export class PersonaController extends BaseController {
//   constructor(private readonly personaService: PersonaService) {
//     super();
//   }

//   @ApiOperation({ summary: 'API para obtener el listado de persona' })
//   @Get()
//   async listar() {
//     const result = await this.personaService.listar();
//     return result;
//   }

//   @ApiOperation({ summary: 'API para crear un persona' })
//   @ApiBearerAuth()
//   @ApiBody({
//     type: CrearPersonaDto,
//     description:
//       'Esta API permite crear un nuevo persona utilizando los datos proporcionados en el cuerpo de la solicitud.',
//     required: true,
//   })
//   @Post()
//   async crear(@Req() req: Request, @Body() empleadoDto: CrearEmpleadoDto) {
//     const result = await this.personaService.crear(empleadoDto);
//     return result;
//   }

//   @ApiOperation({ summary: 'API para crear un empleado' })
//   @ApiBearerAuth()
//   @ApiBody({
//     type: ActualizarEmpleadoDto,
//     description:
//       'Esta API permite actualiar un nuevo empleado utilizando los datos proporcionado en el cuerpo de la solicitud.',
//     required: true,
//   })
//   @Patch('/:id')
//   async actualizar(
//     @Req() req: Request,
//     @Body() empleadodto: ActualizarEmpleadoDto,
//     @Param() params: ParamIdDto,
//   ) {
//     const { id: idEmpleado } = params;
//     return await this.personaService.actualizar(idEmpleado, empleadodto);
//   }
// }
