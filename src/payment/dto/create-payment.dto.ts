import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { PaymentStatus } from '../enums/payment-status.enums';
import { PaymentType } from '../enums/payment-type.enums';

export class CreatePaymentDto {
  @IsEnum(PaymentType)
  @IsNotEmpty()
  payment_type: PaymentType;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  payment_status: PaymentStatus;

  @IsNotEmpty()
  @IsString()
  payment_id: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  createby: string;
}
