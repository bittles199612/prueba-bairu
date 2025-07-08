import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrearPersonaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  documentoIdentidad: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  telefono: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  fechaContratacion: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  puesto: string;

  @ApiProperty()
  @IsOptional()
  salarioBase: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  departamento: string;

  @ApiProperty()
  @IsNotEmpty()
  contrasena: string;

  @ApiProperty()
  @IsOptional()
  activo: boolean;
}
