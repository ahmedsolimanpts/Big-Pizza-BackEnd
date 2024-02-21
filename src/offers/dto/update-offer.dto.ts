import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOfferDto } from './create-offer.dto';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @ApiProperty({
    example: 'Family Offer',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: ['65d5b8076bf8d67aee25ccd5', '65d5b8076bf8d67aee25ccd2'],
    required: false,
  })
  @IsString()
  @IsArray()
  @IsOptional()
  branches?: string[];

  @ApiProperty({
    example: '2020-02-02',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  from?: Date;

  @ApiProperty({
    example: '2020-02-02',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  to?: Date;

  @ApiProperty({
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({
    example: ['65d5b8076bf8d67aee25ccd5', '65d5b8076bf8d67aee25ccd2'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString()
  @IsMongoId()
  items?: string[];

  @ApiProperty({
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;
}
