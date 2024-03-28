import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CashierTransaction } from '../enum/cashier-transaction.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCashierDto {
  @ApiProperty({
    description: 'The amount of the transaction',
    example: 100,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'The type of transaction',
    example: CashierTransaction.ADD,
    enum: CashierTransaction,
    enumName: 'CashierTransaction',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(CashierTransaction)
  transaction: CashierTransaction;

  @ApiPropertyOptional({
    description: 'A note regarding the transaction',
    example: 'This is a sample note.',
    type: String,
  })
  @IsOptional()
  @IsString()
  note: string;
}
