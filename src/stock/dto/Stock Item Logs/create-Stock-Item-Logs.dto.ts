import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateStockItemQuantityDto } from '../stock item quantity/create-stock-item-quantity.dto';
import { Type } from 'class-transformer';
import { StockTransactionTYPE } from 'src/stock/enums/Stock-Transactions.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockItemLogsDto {
  @ApiProperty({
    description: 'The stock item involved in the transaction',
    type: CreateStockItemQuantityDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @Type(() => CreateStockItemQuantityDto)
  item: CreateStockItemQuantityDto;

  @ApiProperty({
    description: 'The type of transaction',
    enum: StockTransactionTYPE,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(StockTransactionTYPE)
  transaction: StockTransactionTYPE;
}
