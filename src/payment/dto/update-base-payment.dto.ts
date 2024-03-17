import { PartialType } from '@nestjs/swagger';
import { CreateBasePaymentDto } from './create-base-payment.dto';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreateBasePaymentDto) {
  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsMongoId()
  @IsString()
  order_id: string;
}
