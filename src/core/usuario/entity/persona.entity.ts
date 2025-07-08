// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import dotenv from 'dotenv';
// import { ComprasMinerales } from './compras_minerales.entity';
// import { Ventas } from './ventas.entity';
// import { Oportunidades } from './oportunidades.entity';
// import { AuditoriaEntity } from '@/common/entity/auditoria.entity';

// dotenv.config();
// @Entity({ name: 'empleados', schema: process.env.DB_SCHEMA })
// export class Empleados extends AuditoriaEntity {
//   @PrimaryGeneratedColumn({
//     type: 'bigint',
//     name: 'id',
//     comment: 'Clave primaria de la tabla Usuario',
//   })
//   id: string;

//   @Column({
//     name: 'usuario',
//     length: 255,
//     type: 'varchar',
//     nullable: false,
//     unique: true,
//     comment: 'usuario dl empleado',
//   })
//   usuario: string;

//   @Column({
//     name: 'contrasena',
//     type: 'varchar',
//     length: 255,
//     nullable: false,
//     comment: 'contrasena del usuario',
//   })
//   contrasena: string;

//   constructor(data?: Partial<Empleados>) {
//     super(data);
//   }
// }
