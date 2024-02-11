import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCouponDto } from './create-coupon.dto';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @ApiProperty({
    example: 'copoun1',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: '[branch1,branch2]',
    required: false,
  })
  @IsOptional()
  @IsArray()
  branches: string[];

  @ApiProperty({
    example: '2020-02-03',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  from: Date;

  @ApiProperty({
    example: '2020-02-03',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  to: Date;

  @ApiProperty({
    example: 20,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  percent_discount: number;
}
