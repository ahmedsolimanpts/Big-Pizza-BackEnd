import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStockItemDto } from './create-stock-item.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStockItemDto extends PartialType(CreateStockItemDto) {
  @ApiPropertyOptional({
    description: 'Optional: The new name of the stock item',
    example: 'Widget A Updated',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Optional: A new brief description of the stock item',
    example: 'An updated high-quality widget for all your widget needs',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
