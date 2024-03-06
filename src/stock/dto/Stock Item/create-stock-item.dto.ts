import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStockItemDto {
  @ApiProperty({
    description: 'The name of the stock item',
    example: 'Widget A',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'A brief description of the stock item',
    example: 'A high-quality widget for all your widget needs',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
