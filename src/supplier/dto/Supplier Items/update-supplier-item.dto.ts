import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CreateSupplierItemDto } from './create-supplier-item.dto';

export class UpdateSupplierItemDto extends PartialType(CreateSupplierItemDto) {
  @ApiPropertyOptional({
    description: 'Name of the supplier Item',
    example: 'ABC',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'supplier ID',
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  supplier?: string;

  @ApiPropertyOptional({
    description: 'Item Price',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;
}
