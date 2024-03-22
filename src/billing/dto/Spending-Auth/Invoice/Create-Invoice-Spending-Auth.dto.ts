import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { CreateSpendingAuthDto } from '../create-Spending-Auth.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceSpendingAuthDto extends CreateSpendingAuthDto {
  @ApiProperty({
    example: '507f191e810c19729de860ea',
    description:
      'MongoDB ObjectId of the invoice related to the spending authorization',
    required: true,
  })
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  invoice: string;
}
