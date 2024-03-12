import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { DeliveryPrice } from '../enums/Deliver-price.enums';
import { DelivereyMethod } from '../enums/Deliverey-method.enums';
import { DeliveryStatus } from '../enums/delivery-status.enums';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  start_location?: CreateLocationDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  end_location: CreateLocationDto;

  @ApiProperty({
    example: 'Mohamed',
  })
  @IsOptional()
  @IsString()
  pilot: string;

  @ApiProperty({
    example: DelivereyMethod,
  })
  @IsOptional()
  @IsEnum(DelivereyMethod)
  deliverey_method: DelivereyMethod;

  @ApiProperty({
    example: DeliveryStatus,
  })
  @IsOptional()
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @ApiProperty({
    example: DeliveryPrice,
  })
  @IsOptional()
  @IsEnum(DeliveryPrice)
  delivery_price: DeliveryPrice;
}
