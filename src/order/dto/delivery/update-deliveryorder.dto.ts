import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { DeliveryPrice } from 'src/delivery/enums/Deliver-price.enums';
import { CreateBaseOrderDto } from '../base-order.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DelivereyMethod } from 'src/delivery/enums/Deliverey-method.enums';
import { DeliveryStatus } from 'src/delivery/enums/delivery-status.enums';

export class UpdateDeliveryOrderDto extends CreateBaseOrderDto {
  @IsOptional()
  @IsMongoId()
  @IsString()
  @ApiPropertyOptional({
    description: 'The MongoDB ID of the end location',
    example: '507f1f77bcf86cd799439011',
  })
  end_location?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The name of the pilot handling the delivery',
    example: 'Mohamed',
    required: false,
  })
  pilot?: string;

  @IsOptional()
  @IsEnum(DelivereyMethod)
  @ApiPropertyOptional({
    description: 'The method of delivery',
    example: DelivereyMethod.BIKE,
    enum: DelivereyMethod,
    required: false,
  })
  deliverey_method?: DelivereyMethod;

  @IsOptional()
  @IsEnum(DeliveryPrice)
  @ApiPropertyOptional({
    description: 'The price category of the delivery',
    example: DeliveryPrice.FOURTY,
    enum: DeliveryPrice,
    required: false,
  })
  delivery_price?: DeliveryPrice;

  @IsOptional()
  @IsEnum(DeliveryStatus)
  @ApiPropertyOptional({
    description: 'The current status of the delivery',
    example: DeliveryStatus.INDELIVER,
    enum: DeliveryStatus,
    required: false,
  })
  delivery_status?: DeliveryStatus;
}
