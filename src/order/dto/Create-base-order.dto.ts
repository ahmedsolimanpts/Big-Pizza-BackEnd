import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemsDto } from './order-items/create-order-items.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBaseOrderDto {
  @ApiProperty({
    type: [CreateOrderItemsDto],
    description: 'The list of order items',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemsDto)
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  items: CreateOrderItemsDto[];

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'The date and time when the order is ready',
  })
  @IsOptional()
  @IsDateString()
  readyat?: Date;

  @ApiPropertyOptional({
    type: [String],
    description: 'List of offer IDs applied to the order',
  })
  @IsOptional()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  offers?: string[];

  @ApiPropertyOptional({
    type: String,
    description: 'Coupon ID applied to the order',
  })
  @IsOptional()
  @IsMongoId()
  @IsString()
  coupon?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Notes for the kitchen',
  })
  @IsOptional()
  @IsString()
  kitchen_notes?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Customer ID',
  })
  @IsOptional()
  @IsMongoId()
  @IsString()
  customer?: string;
}
