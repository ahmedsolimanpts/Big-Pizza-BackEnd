import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
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
  @IsString()
  @IsArray()
  @IsNotEmpty()
  branches: string[];

  @ApiProperty({
    example: '2020-02-02',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  from: Date;

  @ApiProperty({
    example: '2020-02-02',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  to: Date;

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: ['65d5b8076bf8d67aee25ccd5', '65d5b8076bf8d67aee25ccd2'],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsString()
  @IsMongoId()
  items: string[];

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
