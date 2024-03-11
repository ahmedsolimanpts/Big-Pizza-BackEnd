import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The phone numbers of the customer',
    example: ['1234567890'],
    type: [String],
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  @ArrayMinSize(1)
  phone?: string[];

  @ApiProperty({
    description: 'The locations associated with the customer',
    type: [CreateLocationDto],
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateLocationDto)
  locations?: CreateLocationDto[];

  @ApiProperty({
    description: 'Optional notes about the customer',
    example: 'Important client',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
