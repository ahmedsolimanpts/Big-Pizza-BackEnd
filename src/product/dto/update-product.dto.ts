import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ProductCategory } from '../enums/product-category.enums';
import { ProductComponents } from '../enums/product-components.enum';
import { ProductSubCategory } from '../enums/product-subcategory.enum';
import { ProductSize } from '../enums/size.enum';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  production_price?: number;

  @IsOptional()
  branch?: string;

  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @IsEnum(ProductSubCategory)
  subcategory?: ProductSubCategory;

  @IsOptional()
  @IsEnum(ProductSize)
  size?: ProductSize;

  @IsOptional()
  @IsEnum(ProductComponents)
  components?: ProductComponents[];

  @IsOptional()
  @IsArray()
  @IsString()
  images?: string[];

  @IsOptional()
  @IsBoolean()
  can_deliver?: boolean;
}
