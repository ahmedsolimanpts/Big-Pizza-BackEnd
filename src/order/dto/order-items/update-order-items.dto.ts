import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ProductComponents } from 'src/product/enums/product-components.enum';

export class UpdateOrderItemsDto {
  @ApiPropertyOptional({
    type: String,
    description: 'The ID of the product',
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  product?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'A verbose name for the product',
  })
  @IsOptional()
  @IsString()
  verbose_name?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'The quantity of the product',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Additional note for the item',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'List of extra component IDs added to the item',
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  @IsString({ each: true })
  extra?: string[];

  @ApiPropertyOptional({
    type: 'array',
    description: 'List of components to exclude from the item',
    isArray: true,
  })
  @IsOptional()
  @IsEnum(ProductComponents, { each: true })
  @ArrayMinSize(0)
  @IsArray()
  without_component?: ProductComponents[];
}
