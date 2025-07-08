// import { Injectable } from '@nestjs/common';
// import { PaginacionQueryDto } from '../dto/paginacion-query.dto';
// import { DataSource, QueryRunner } from 'typeorm';
// import { Empleados } from '../entity/empleados.entity';
// import { BaseRepository } from '@/common/base/base-repository.entity';
// import { CrearEmpleadoDto } from '../dto/crear-persona.dto';
// import { ActualizarEmpleadoDto } from '../dto/actualizar-persona.dto';

// @Injectable()
// export class EmpleadoRepository extends BaseRepository<Empleados> {
//   constructor(protected readonly dataSource: DataSource) {
//     super(Empleados, dataSource);
//   }

//   async listar() {
//     return await this.dataSource
//       .getRepository(Empleados)
//       .createQueryBuilder('empleado')
//       .select([
//         'empleado.id',
//         'empleado.usuario',
//         'empleado.nombre',
//         'empleado.documentoIdentidad',
//         'empleado.tipo',
//         'empleado.direccion',
//         'empleado.telefono',
//         'empleado.email',
//         'empleado.fechaContratacion',
//         'empleado.puesto',
//         'empleado.salarioBase',
//         'empleado.puesto',
//         'empleado.departamento',
//         'empleado.contrasena',
//         'empleado.activo',
//       ])
//       .addOrderBy('empleado.id', 'DESC')
//       .getMany();
//   }

//   async crear(empleadoDto: CrearEmpleadoDto, queryRunner: QueryRunner) {
//     return await this.getRepository(queryRunner).save(
//       new Empleados({
//         ...empleadoDto,
//       }),
//     );
//   }

//   async buscarPorId(id: string) {
//     return await this.dataSource
//       .getRepository(Empleados)
//       .createQueryBuilder('empleados')
//       .where({ id })
//       .getOne();
//   }

//   async buscarEmpleadoPorCi(ci: string) {
//     return await this.dataSource
//       .getRepository(Empleados)
//       .createQueryBuilder('empleados')
//       .where('persona.documentoIdentidad = :ci', { ci })
//       .getOne();
//   }

//   async buscarEmpleado(usuario: string) {
//     return await this.dataSource
//       .getRepository(Empleados)
//       .createQueryBuilder('empleado')
//       .where({ usuario: usuario })
//       .getOne();
//   }

//   async actualizar(
//     id: string,
//     empleadoDto: ActualizarEmpleadoDto,
//     queryRunner: QueryRunner,
//   ) {
//     return await this.getRepository(queryRunner).update(
//       id,
//       new Empleados({
//         ...empleadoDto,
//       }),
//     );
//   }
// }
