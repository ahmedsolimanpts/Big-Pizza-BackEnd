import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDeliveryDto } from './create-delivery.dto';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested, IsString, IsEnum } from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { DeliveryPrice } from '../enums/Deliver-price.enums';
import { DelivereyMethod } from '../enums/Deliverey-method.enums';
import { DeliveryStatus } from '../enums/delivery-status.enums';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  start_location?: CreateLocationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  end_location?: CreateLocationDto;

  @ApiPropertyOptional({
    example: 'Mohamed',
  })
  @IsOptional()
  @IsString()
  pilot?: string;

  @ApiPropertyOptional({
    example: DelivereyMethod,
  })
  @IsOptional()
  @IsEnum(DelivereyMethod)
  deliverey_method?: DelivereyMethod;

  @ApiPropertyOptional({
    example: DeliveryStatus,
  })
  @IsOptional()
  @IsEnum(DeliveryStatus)
  status?: DeliveryStatus;

  @ApiPropertyOptional({
    example: DeliveryPrice,
  })
  @IsOptional()
  @IsEnum(DeliveryPrice)
  delivery_price?: DeliveryPrice;
}
