import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStockGardDto } from './create-stock-gard.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStockItemQuantityDto } from '../stock item quantity/create-stock-item-quantity.dto';
import { StockItemCategory } from 'src/stock/enums/Stock-Item-Category.enum';

export class UpdateStockGardDto extends PartialType(CreateStockGardDto) {
  @ApiPropertyOptional({
    description: 'Category of stock Gard Items',
    enum: StockItemCategory,
    example: StockItemCategory,
  })
  @IsNotEmpty()
  @IsEnum(StockItemCategory)
  @IsString()
  category: StockItemCategory;

  @ApiPropertyOptional({
    description: 'Optional: Array of stock item quantities to update',
    type: [CreateStockItemQuantityDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStockItemQuantityDto)
  items?: CreateStockItemQuantityDto[];
}
