import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdatePaymentDto } from '../update-base-payment.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateCashPaymentDto extends UpdatePaymentDto {
  @ApiPropertyOptional({
    type: String,
    description: 'The ID of the Branch associated with this payment',
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  branch?: string;
}
