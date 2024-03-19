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
  price?: number;

  @ApiPropertyOptional({
    example: 100,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
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
  category?: ProductCategory;

  @ApiPropertyOptional({
    example: ProductSubCategory,
    required: true,
  })
  @IsOptional()
  @IsEnum(ProductSubCategory)
  subcategory?: ProductSubCategory;

  @ApiPropertyOptional({
    example: ProductSize,
    required: true,
  })
  @IsOptional()
  @IsEnum(ProductSize)
  size?: ProductSize;

  @ApiPropertyOptional({
    example: ProductComponents,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProductComponents)
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
