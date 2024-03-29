import { IsOptional, IsString } from 'class-validator';
import { UpdatePaymentDto } from '../update-base-payment.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePayPalPaymentDto extends UpdatePaymentDto {
  @ApiPropertyOptional({
    type: String,
    description: 'The ID of payment On PayPal',
  })
  @IsOptional()
  @IsString()
  payment_id?: string;
}
