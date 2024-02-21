import { IsNumber, IsOptional } from 'class-validator';
import { CreateBaseOrderDto } from '../base-order.dto';

export class CreateDineInOrderDto extends CreateBaseOrderDto {
  @IsNumber()
  @IsOptional()
  table_number: number;
}
