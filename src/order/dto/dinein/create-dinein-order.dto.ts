import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBaseOrderDto } from '../Create-base-order.dto';

export class CreateDineInOrderDto extends CreateBaseOrderDto {
  @IsString()
  @IsNotEmpty()
  table_number: string;
}
