import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBasePaymentDto } from './create-base-payment.dto';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaymentCurrency } from '../enums/payment-currency.enum';

export class UpdatePaymentDto extends PartialType(CreateBasePaymentDto) {
  @ApiPropertyOptional({
    type: Number,
    description: 'The amount to be paid',
    minimum: 0.01, // Assuming the smallest payment amount possible is 0.01
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'The ID of the order associated with this payment',
  })
  @IsOptional()
  @IsMongoId()
  @IsString()
  order_id?: string;

  @ApiPropertyOptional({
    enum: PaymentCurrency,
    description: 'The currency of the payment',
  })
  @IsOptional()
  @IsString()
  @IsEnum(PaymentCurrency)
  currency?: PaymentCurrency;
}
