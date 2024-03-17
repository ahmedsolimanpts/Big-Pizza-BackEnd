import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateBaseOrderDto } from '../base-order.dto';
import { CreateDeliveryDto } from 'src/delivery/dto/create-delivery.dto';
import { Type } from 'class-transformer';
import { DeliveryPrice } from 'src/delivery/enums/Deliver-price.enums';

export class CreateDeliveryOrderDto extends CreateBaseOrderDto {
  @IsNotEmpty()
  @ValidateNested()
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @Type(() => CreateDeliveryDto)
  delivery: CreateDeliveryDto;

  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  customer: string;

  @IsEnum(DeliveryPrice)
  @IsNotEmpty()
  @IsNumber()
  delivery_price: DeliveryPrice;
}
