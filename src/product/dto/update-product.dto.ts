import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsPositive,
} from 'class-validator';
import { ProductCategory } from '../enums/product-category.enums';
import { ProductComponents } from '../enums/product-components.enum';
import { ProductSubCategory } from '../enums/product-subcategory.enum';
import { ProductSize } from '../enums/size.enum';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    example: 'product 1',
    required: true,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 100,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({
    example: 100,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiPropertyOptional({
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  production_price?: number;

  @ApiPropertyOptional({
    example: 'BRANCH ID',
    required: true,
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  branch?: string;

  @ApiPropertyOptional({
    example: ProductCategory,
    required: true,
  })
  @IsOptional()
  @IsEnum(ProductCategory)
  @IsString()
  category?: ProductCategory;

  @ApiPropertyOptional({
    example: ProductSubCategory,
    required: true,
  })
  @IsOptional()
  @IsEnum(ProductSubCategory)
  @IsString()
  subcategory?: ProductSubCategory;

  @ApiPropertyOptional({
    example: ProductSize,
    required: true,
  })
  @IsOptional()
  @IsEnum(ProductSize)
  @IsString()
  size?: ProductSize;

  @ApiPropertyOptional({
    example: ProductComponents,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProductComponents)
  @IsString()
  components?: ProductComponents[];

  @ApiPropertyOptional({
    example: 'http://example.com',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString()
  images?: string[];

  @ApiPropertyOptional({
    example: 'true',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  can_deliver?: boolean;

  @ApiPropertyOptional({
    example: 'true',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_sensetive?: boolean;

  @ApiPropertyOptional({
    example: 'true',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_extra?: boolean;
}
