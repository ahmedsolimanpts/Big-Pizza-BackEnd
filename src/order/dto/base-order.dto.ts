import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemsDto } from './order-items/create-order-items.dto';
import { Type } from 'class-transformer';

export class CreateBaseOrderDto {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemsDto)
  @IsArray()
  @ArrayMinSize(1)
  items: CreateOrderItemsDto[];

  @IsOptional()
  @IsDateString()
  readyat?: Date;

  @IsOptional()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  @IsArray()
  offers?: string[];

  @IsOptional()
  @IsMongoId()
  coupon?: string;

  @IsOptional()
  @IsString()
  kitchen_notes?: string;

  @IsOptional()
  @IsMongoId()
  customer?: string;
}
