import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBaseOrderDto } from '../Create-base-order.dto';
import { DeliveryPrice } from 'src/delivery/enums/Deliver-price.enums';
import { ApiProperty } from '@nestjs/swagger';
import { DelivereyMethod } from 'src/delivery/enums/Deliverey-method.enums';
import { DeliveryStatus } from 'src/delivery/enums/delivery-status.enums';

export class CreateDeliveryOrderDto extends CreateBaseOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ApiProperty({
    description: 'The MongoDB ID of the end location',
    example: '507f1f77bcf86cd799439011',
  })
  end_location: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The name of the pilot handling the delivery',
    example: 'Mohamed',
    required: false,
  })
  pilot?: string;

  @IsOptional()
  @IsEnum(DelivereyMethod)
  @ApiProperty({
    description: 'The method of delivery',
    example: DelivereyMethod.BIKE,
    enum: DelivereyMethod,
    required: false,
  })
  deliverey_method?: DelivereyMethod;

  @IsNotEmpty()
  @IsEnum(DeliveryPrice)
  @ApiProperty({
    description: 'The price category of the delivery',
    example: DeliveryPrice.FOURTY,
    enum: DeliveryPrice,
    required: false,
  })
  delivery_price: DeliveryPrice;

  @IsOptional()
  @IsEnum(DeliveryStatus)
  @ApiProperty({
    description: 'The current status of the delivery',
    example: DeliveryStatus.INDELIVER,
    enum: DeliveryStatus,
    required: false,
  })
  delivery_status?: DeliveryStatus;
}
