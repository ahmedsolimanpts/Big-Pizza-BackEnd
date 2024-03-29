import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCouponDto } from './create-coupon.dto';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @ApiPropertyOptional({
    example: 'copoun1',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '[branch1,branch2]',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  branches?: string[];

  @ApiPropertyOptional({
    example: '2020-02-03',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  from?: Date;

  @ApiPropertyOptional({
    example: '2020-02-03',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  to?: Date;

  @ApiPropertyOptional({
    example: 20,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiPropertyOptional({
    example: 10,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  percent_discount?: number;
}
