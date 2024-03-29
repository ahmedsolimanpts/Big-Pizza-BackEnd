import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({
    example: 'Family Offer',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: ['65d5b8076bf8d67aee25ccd5', '65d5b8076bf8d67aee25ccd2'],
    required: true,
  })
  @IsString({ each: true })
  @IsMongoId({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  branches: string[];

  @ApiPropertyOptional({
    example: '2020-02-02',
    required: true,
  })
  @IsDateString()
  @IsOptional()
  from?: Date;

  @ApiPropertyOptional({
    example: '2020-02-02',
    required: true,
  })
  @IsDateString()
  @IsOptional()
  to?: Date;

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    example: ['65d5b8076bf8d67aee25ccd5', '65d5b8076bf8d67aee25ccd2'],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsMongoId({ each: true })
  items: string[];

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;
}
