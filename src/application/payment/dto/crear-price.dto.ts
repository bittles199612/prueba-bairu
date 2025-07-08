import { RecurringType } from '@/common/constant';
import { IsNotEmpty, IsString } from 'class-validator';

export class Recurring {
  @IsNotEmpty()
  interval: RecurringType;
}

export class CrearPriceDto {
  @IsNotEmpty()
  unit_amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  recurring: Recurring;

  @IsNotEmpty()
  @IsString()
  product: string;
}
