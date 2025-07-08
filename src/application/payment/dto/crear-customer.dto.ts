import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrearCustomer {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  test_clock?: string;
}
