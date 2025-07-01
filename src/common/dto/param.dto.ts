import { IsNotEmpty, IsString } from 'class-validator';

export class ParamIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
