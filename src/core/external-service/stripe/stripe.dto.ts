import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductData {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class PriceData {
  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  unit_amount: number;

  @IsOptional()
  product_data?: ProductData;
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
  @IsString()
  mode: string;
}
