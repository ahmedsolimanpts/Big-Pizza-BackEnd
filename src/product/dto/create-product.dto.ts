import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ProductCategory } from '../enums/product-category.enums';
import { ProductComponents } from '../enums/product-components.enum';
import { ProductSubCategory } from '../enums/product-subcategory.enum';
import { ProductSize } from '../enums/size.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'product 1',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiPropertyOptional({
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  production_price: number;

  @ApiProperty({
    example: 'BRANCH ID',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  branch: string;

  @ApiProperty({
    example: ProductCategory,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ProductCategory)
  @IsString()
  category: ProductCategory;

  @ApiProperty({
    example: ProductSubCategory,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ProductSubCategory)
  @IsString()
  subcategory: ProductSubCategory;

  @ApiProperty({
    example: ProductSize,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ProductSize)
  @IsString()
  size: ProductSize;

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
