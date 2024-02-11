import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({
    example: 'copoun1',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '[branch1,branch2]',
    required: false,
  })
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  percent_discount: number;
}
