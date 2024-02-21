import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemsDto } from './order-items/create-order-items.dto';
import { Type } from 'class-transformer';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { OrderStatus } from '../enums/Order-Status.enums';

export class CreateBaseOrderDto {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemsDto)
  items: CreateOrderItemsDto;

  @IsOptional()
  @IsDateString()
  readyat: Date;

  @IsOptional()
  @IsString()
  @IsArray()
  offers?: string;

  @IsOptional()
  @IsMongoId()
  coupon?: string;

  @IsOptional()
  @IsString()
  kitchen_notes?: string;

  @IsOptional()
  @IsMongoId()
  customer?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDto)
  payment?: CreatePaymentDto;

  @IsMongoId()
  branch: string;
  @IsMongoId()
  createby: string;
  @IsMongoId()
  approvedby: string;

  @IsEnum(OrderStatus)
  order_status: OrderStatus;
}
