import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCashierDto } from './create-cashier.dto';
import {
  IsOptional,
  IsNumber,
  IsPositive,
  IsString,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { CashierTransaction } from '../enum/cashier-transaction.enum';

export class UpdateCashierDto extends PartialType(CreateCashierDto) {
  @ApiPropertyOptional({
    description: 'The amount of the transaction',
    example: 100,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @ApiPropertyOptional({
    description: 'The type of transaction',
    example: CashierTransaction.ADD,
    enum: CashierTransaction,
  })
  @IsOptional()
  @IsString()
  @IsEnum(CashierTransaction)
  transaction?: CashierTransaction;

  @ApiPropertyOptional({
    description: 'ID of the creator of this record',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  create_by: string;

  @ApiPropertyOptional({
    description: 'A note regarding the transaction',
    example: 'This is a sample note.',
    type: String,
  })
  @IsOptional()
  @IsString()
  note?: string;
}
