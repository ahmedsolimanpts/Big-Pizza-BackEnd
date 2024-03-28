import {
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateStockItemQuantityDto } from '../stock item quantity/create-stock-item-quantity.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StockItemCategory } from 'src/stock/enums/Stock-Item-Category.enum';

export class CreateStockGardDto {
  @ApiProperty({
    description: 'Category of stock Gard Items',
    enum: StockItemCategory,
    example: StockItemCategory,
  })
  @IsNotEmpty()
  @IsEnum(StockItemCategory)
  @IsString()
  category: StockItemCategory;

  @ApiProperty({
    description: 'List of stock item quantities',
    type: [CreateStockItemQuantityDto],
    isArray: true,
  })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateStockItemQuantityDto)
  items: CreateStockItemQuantityDto[];
}
