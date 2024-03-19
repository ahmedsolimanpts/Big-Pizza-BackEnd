import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductComponents } from 'src/product/enums/product-components.enum';

export class CreateOrderItemsDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  product: string;

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
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  @IsString({ each: true })
  extra?: string[];

  @IsOptional()
  @IsEnum(ProductComponents)
  @IsArray()
  without_component?: ProductComponents[];
}
