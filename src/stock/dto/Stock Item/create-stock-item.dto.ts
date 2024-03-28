import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StockItemCategory } from 'src/stock/enums/Stock-Item-Category.enum';

export class CreateStockItemDto {
  @ApiProperty({
    description: 'The name of the stock item',
    example: 'Widget A',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The category of the stock item',
    enum: StockItemCategory,
    example: StockItemCategory,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(StockItemCategory)
  category: StockItemCategory;

  @ApiPropertyOptional({
    description: 'A brief description of the stock item',
    example: 'A high-quality widget for all your widget needs',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
