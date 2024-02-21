import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateBaseOrderDto } from '../base-order.dto';
import { CreateDeliveryDto } from 'src/delivery/dto/create-delivery.dto';
import { Type } from 'class-transformer';

export class CreateDelivereyOrderDto extends CreateBaseOrderDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateDeliveryDto)
  deliverey: CreateDeliveryDto;
}
