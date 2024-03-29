import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSupplierDto } from './create-supplier.dto';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
  @ApiPropertyOptional({
    description: 'Name of the supplier',
    example: 'ABC Supplies',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Contact phone numbers for the supplier',
    example: ['+1234567890', '+0987654321'],
    type: [String],
  })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  phones?: string[];

  @ApiPropertyOptional({
    description: 'Location of the supplier',
    type: () => CreateLocationDto,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateLocationDto)
  location?: CreateLocationDto;
}
