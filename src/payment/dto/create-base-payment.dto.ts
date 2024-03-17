import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentCurrency } from '../enums/payment-currency.enum';

export class CreateBasePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  order_id: string;

  @IsOptional()
  @IsString()
  @IsEnum(PaymentCurrency)
  currency: PaymentCurrency;
}
