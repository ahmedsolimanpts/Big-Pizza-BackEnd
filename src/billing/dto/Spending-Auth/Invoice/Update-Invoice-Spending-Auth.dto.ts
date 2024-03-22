import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { UpdateSpendingAuthDto } from '../update-Spending-Auth.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateInvoiceSpendingAuthDto extends PartialType(
  UpdateSpendingAuthDto,
) {
  @ApiPropertyOptional({
    example: '507f191e810c19729de860ea',
    description:
      'MongoDB ObjectId of the invoice related to the spending authorization',
    required: false,
  })
  @IsMongoId()
  @IsString()
  @IsOptional()
  invoice?: string;
}
