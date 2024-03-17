import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateDeliveryDto } from 'src/delivery/dto/create-delivery.dto';
import { Type } from 'class-transformer';
import { DeliveryPrice } from 'src/delivery/enums/Deliver-price.enums';
import { CreateBaseOrderDto } from '../base-order.dto';

export class UpdateDeliveryOrderDto extends CreateBaseOrderDto {
  @IsOptional()
  @ValidateNested()
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @Type(() => CreateDeliveryDto)
  delivery?: CreateDeliveryDto;

  @IsOptional()
  @IsMongoId()
  @IsString()
  customer?: string;

  @IsEnum(DeliveryPrice)
  @IsOptional()
  @IsNumber()
  delivery_price?: DeliveryPrice;
}
