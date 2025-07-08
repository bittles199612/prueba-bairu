// import {
//   Inject,
//   Injectable,
//   NotFoundException,
//   PreconditionFailedException
// } from '@nestjs/common'
// import { Messages } from '@/common/constants/response-messages'
// import { EmpleadoRepository } from '../repository/empleado.repository'
// import { CrearEmpleadoDto } from '../dto/crear-empleado.dto'
// import { BaseService } from '@/common/base/base-service'
// import { DataSource } from 'typeorm'
// import { ActualizarEmpleadoDto } from '../dto/actualizar-empleado.dto'

// @Injectable()
// export class EmpleadoService extends BaseService {
//   constructor(
//     protected readonly dataSource: DataSource,
//     @Inject(EmpleadoRepository)
//     private readonly empleadoRepository: EmpleadoRepository
//   ) {
//     super()
//   }

//   async listar() {
//     return await this.empleadoRepository.listar()
//   }

//   async crear(emleadoDto: CrearEmpleadoDto) {
//     const queryRunner = await this.iniciarTransaccion()
//     try {
//       return await this.empleadoRepository.crear(emleadoDto, queryRunner)
//     } catch (error) {
//       throw new PreconditionFailedException('error al crer usuario' + error)
//     }
//   }

//   async buscarEmpleadoPorCI(ci: string) {
//     return await this.empleadoRepository.buscarEmpleadoPorCi(ci)
//   }

//   async buscarEmpleadoId(id: string) {
//     const usuario = await this.empleadoRepository.buscarPorId(id)
//     if (!usuario) {
//       throw new NotFoundException(Messages.INVALID_USER)
//     }
//     return usuario
//   }

//   async buscarEmpleado(usuario: string) {
//     return await this.empleadoRepository.buscarEmpleado(usuario)
//   }

//   async actualizar(id: string, empleadoDto: ActualizarEmpleadoDto) {
//     const queryRunner = await this.iniciarTransaccion()
//     try {
//       const buscar = await this.empleadoRepository.buscarPorId(id)
//       if (!buscar)
//         throw new PreconditionFailedException(
//           Messages.EXCEPTION_NOT_FOUND_EMPLEADO
//         )
//       const resp = await this.empleadoRepository.actualizar(
//         id,
//         empleadoDto,
//         queryRunner
//       )
//       await queryRunner.commitTransaction()
//       return resp
//     } catch (error) {
//       await queryRunner.release()
//       throw new PreconditionFailedException(error)
//     } finally {
//       await queryRunner.release()
//     }
//   }
// }
