import { Branch } from 'src/branch/Model/branch.model';
import { OrderItems } from '../Model/order.model';
import { OrderType } from '../enums/Order-Types.enums';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class AgentCreateOrderDto {
  @IsNotEmpty()
  @IsArray()
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
