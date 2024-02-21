import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderItemsDto {
  @IsNotEmpty()
  @IsString()
  items: string;
}
