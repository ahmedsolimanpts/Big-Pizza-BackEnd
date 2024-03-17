import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductCategory } from '../enums/product-category.enums';
import { ProductComponents } from '../enums/product-components.enum';
import { ProductSubCategory } from '../enums/product-subcategory.enum';
import { ProductSize } from '../enums/size.enum';
import { ApiProperty } from '@nestjs/swagger';

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
  price: number;

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
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
  category: ProductCategory;

  @ApiProperty({
    example: ProductSubCategory,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ProductSubCategory)
  subcategory: ProductSubCategory;

  @ApiProperty({
    example: ProductSize,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ProductSize)
  size: ProductSize;

  @ApiProperty({
    example: ProductComponents,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProductComponents)
  components: ProductComponents[];

  @ApiProperty({
    example: 'http://example.com',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString()
  images?: string[];

  @ApiProperty({
    example: 'true',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  can_deliver?: boolean;

  @ApiProperty({
    example: 'true',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_sensetive?: boolean;
}
