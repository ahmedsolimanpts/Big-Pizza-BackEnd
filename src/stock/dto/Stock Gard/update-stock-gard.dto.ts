import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStockGardDto } from './create-stock-gard.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStockItemQuantityDto } from '../stock item quantity/create-stock-item-quantity.dto';

export class UpdateStockGardDto extends PartialType(CreateStockGardDto) {
  @ApiPropertyOptional({
    description: 'Optional: Array of stock item quantities to update',
    type: [CreateStockItemQuantityDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStockItemQuantityDto)
  items?: CreateStockItemQuantityDto[];
}
