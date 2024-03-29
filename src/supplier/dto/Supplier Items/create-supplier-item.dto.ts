import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSupplierItemDto {
  @ApiProperty({ description: 'Name of the supplier Item', example: 'ABC' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'supplier ID',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  supplier: string;

  @ApiProperty({
    description: 'Item Price',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
