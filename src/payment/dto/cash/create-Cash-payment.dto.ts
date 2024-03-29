import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCashPaymentDto {
  @ApiProperty({
    type: String,
    description: 'The ID of the Branch associated with this payment',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  branch: string;
}
