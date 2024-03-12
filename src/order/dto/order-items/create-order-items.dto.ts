import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Product } from 'src/product/Model/product.model';
import { ProductComponents } from 'src/product/enums/product-components.enum';

export class CreateOrderItemsDto {
  @IsNotEmpty()
  @IsString()
  item: string;

  @IsOptional()
  @IsString()
  verbose_name?: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsEnum(Product)
  @IsArray()
  extra?: Product[];

  @IsOptional()
  @IsEnum(ProductComponents)
  @IsArray()
  without_component?: ProductComponents[];
}
