// import { Injectable } from '@nestjs/common'
// import { PoliticaDto } from '../dto/politica.dto'
// import { BaseService } from '@/common/base/base-service'
// import { AuthZManagementService } from 'nest-authz'

// @Injectable()
// export class AuthorizationService extends BaseService {
//   constructor(private readonly authZManagerService: AuthZManagementService) {
//     super()
//   }

//   async crearPolitica(politica: PoliticaDto) {
//     const { sujeto, objeto, accion, app } = politica
//     await this.authZManagerService.addPolicy(sujeto, objeto, accion, app)
//     return politica
//   }

//   async actualizarPolitica(politica: PoliticaDto, politicaNueva: PoliticaDto) {
//     const { sujeto, objeto, accion, app } = politicaNueva
//     await this.eliminarPolitica(politica)
//     await this.authZManagerService.addPolicy(sujeto, objeto, accion, app)
//   }

//   async eliminarPolitica(politica: PoliticaDto) {
//     const { sujeto, objeto, accion, app } = politica
//     await this.authZManagerService.removePolicy(sujeto, objeto, accion, app)
//     return politica
//   }

//   async obtenerRoles() {
//     return await this.authZManagerService.getFilteredPolicy(3, 'frontend')
//   }
// }
// // npm install \
// //   @nestjs/common@11 \
// //   @nestjs/core@11 \
// //   @nestjs/config@4 \
// //   @nestjs/jwt@11 \
// //   @nestjs/passport@11 \
// //   @nestjs/platform-express@11 \
// //   @nestjs/typeorm@11 \
// //   @nestjs/schedule@6 \
// //   @nestjs/swagger@7 \
// //   @nestjs/testing@11
// //
