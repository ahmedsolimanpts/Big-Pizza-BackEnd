import { ArrayMinSize, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateStockItemQuantityDto } from '../stock item quantity/create-stock-item-quantity.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockGardDto {
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
