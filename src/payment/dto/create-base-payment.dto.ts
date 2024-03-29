import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaymentCurrency } from '../enums/payment-currency.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBasePaymentDto {
  @ApiProperty({
    type: Number,
    description: 'The amount to be paid',
    minimum: 0.01, // Assuming the smallest payment amount possible is 0.01
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    type: String,
    description: 'The ID of the order associated with this payment',
  })
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  order_id: string;

  @ApiProperty({
    enum: PaymentCurrency,
    description: 'The currency of the payment',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentCurrency)
  currency: PaymentCurrency;
}
