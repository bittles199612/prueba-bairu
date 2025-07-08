// import { PaginacionQueryDto } from '@/application/axar/dto/paginacion-query.dto'
// import { ApiProperty } from '@nestjs/swagger'
// import { Type } from 'class-transformer'
// import {
//   IsNotEmpty,
//   IsNumber,
//   IsNumberString,
//   IsOptional,
//   IsString,
//   ValidateNested
// } from 'class-validator'

// export class PropiedadesDto {
//   @ApiProperty({ example: 'dashboard' })
//   @IsOptional()
//   @IsString()
//   icono?: string

//   @ApiProperty({ example: 'Modulo de estadisticas' })
//   @IsString()
//   descripcion?: string

//   @ApiProperty()
//   @IsNumber()
//   orden: number
// }

// export class CrearModuloDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   id: string

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   label: string

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   url: string

//   @ApiProperty({ example: 'Estadisticas' })
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

// export class FiltroModuloDto extends PaginacionQueryDto {
//   readonly seccion?: boolean
// }
