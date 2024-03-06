import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStockItemLogsDto } from './create-Stock-Item-Logs.dto';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StockTransactionTYPE } from 'src/stock/enums/Stock-Transactions.enum';
import { CreateStockItemQuantityDto } from '../stock item quantity/create-stock-item-quantity.dto';

export class UpdateStockItemLogsDto extends PartialType(
  CreateStockItemLogsDto,
) {
  @ApiPropertyOptional({
    description:
      'Optional: The stock item involved in the transaction to update',
    type: CreateStockItemQuantityDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStockItemQuantityDto)
  item?: CreateStockItemQuantityDto;

  @ApiPropertyOptional({
    description: 'Optional: The new type of transaction',
    enum: StockTransactionTYPE,
  })
  @IsOptional()
  @IsString()
  @IsEnum(StockTransactionTYPE)
  transaction?: StockTransactionTYPE;
}
