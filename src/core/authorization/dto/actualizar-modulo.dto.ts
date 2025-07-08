// import { ApiProperty } from '@nestjs/swagger'
// import { Type } from 'class-transformer'
// import {
//   IsNotEmpty,
//   IsNumberString,
//   IsOptional,
//   IsString,
//   ValidateNested
// } from 'class-validator'
// import { PropiedadesDto } from './crear-modulo.dto'

// export class ActualizarModuloDto {
//   @ApiProperty({ example: 'Tramites' })
//   @IsNotEmpty()
//   @IsString()
//   label: string

//   @ApiProperty({ example: 'https://google' })
//   @IsNotEmpty()
//   @IsString()
//   url: string

//   @ApiProperty({ example: 'Modulo de tramites' })
//   @IsNotEmpty()
//   @IsString()
//   nombre: string

//   @ApiProperty()
//   @ValidateNested()
//   @Type(() => PropiedadesDto)
//   propiedades: PropiedadesDto

//   @IsOptional()
//   @IsNumberString()
//   idModulo?: string

//   @ApiProperty({ example: 'ACTIVO' })
//   @IsOptional()
//   @IsString()
//   estado?: string
// }
