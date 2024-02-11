import { Branch } from 'src/branch/Model/branch.model';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { OrderItems } from 'src/order/Model/order.model';
import { OrderType } from 'src/order/enums/Order-Types.enums';

export class CashierCreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  items: OrderItems[];

  @IsNotEmpty()
  branch: Branch;

  @IsNotEmpty()
  @IsEnum(OrderType)
  order_type: OrderType;

  @IsOptional()
  @IsDateString()
  readyat: Date;

  @IsOptional()
  @IsNumber()
  service: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsNumber()
  percent_discount: number;

  @IsOptional()
  coupons: string;

  @IsOptional()
  notes: string;
}
