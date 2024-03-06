import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-Transaction.dto';
import {
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStockItemQuantityDto } from '../stock item quantity/create-stock-item-quantity.dto';

export class UpdateStockTransactionDto extends PartialType(
  CreateTransactionDto,
) {
  @ApiPropertyOptional({
    description: 'Array of stock item quantities involved in the transaction',
    type: [CreateStockItemQuantityDto],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateStockItemQuantityDto)
  stock_items?: CreateStockItemQuantityDto[];

  @ApiPropertyOptional({
    description: 'The MongoDB ObjectId of the branch transferring to',
    example: '507f191e810c19729de860ea',
  })
  @IsMongoId()
  @IsOptional()
  @IsString()
  transfer_to?: string;
}
