import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Interval } from './constant';

export class ProductData {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class Recurring {
  @IsNotEmpty()
  @IsString()
  interval: Interval;
}

export class PriceData {
  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  unit_amount: number;

  @IsOptional()
  product_data?: ProductData;

  @IsOptional()
  recurring?: Recurring;
}

export class LineItems {
  @IsNotEmpty()
  price_data: PriceData;

  @IsNotEmpty()
  quantity: number;
}

export class CrearStripe {
  @IsNotEmpty()
  lineItems: LineItems[];

  @IsNotEmpty()
  @IsOptional()
  customer?: string;

  @IsNotEmpty()
  @IsString()
  mode: string;
}

export class CrearSubscripcion {
  @IsNotEmpty()
  lineItems: LineItemType[];

  @IsNotEmpty()
  @IsOptional()
  customer?: string;

  @IsNotEmpty()
  @IsString()
  mode: string;
}

export class LineItemType {
  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  quantity: number;
}
