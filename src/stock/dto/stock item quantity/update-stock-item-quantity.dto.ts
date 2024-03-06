import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStockItemQuantityDto } from './create-stock-item-quantity.dto';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStockItemQuantityDto extends PartialType(
  CreateStockItemQuantityDto,
) {
  @ApiPropertyOptional({
    description: 'Optional: The new MongoDB ObjectId of the stock item',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsOptional()
  @IsString()
  stock_item?: string;

  @ApiPropertyOptional({
    description: 'Optional: The new quantity of the stock item',
    example: 50,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
