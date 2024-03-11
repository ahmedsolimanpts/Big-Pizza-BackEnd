import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The phone numbers of the customer',
    example: ['1234567890'],
    type: [String],
    isArray: true,
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  phone: string[];

  @ApiProperty({
    description: 'The locations associated with the customer',
    type: [CreateLocationDto],
    isArray: true,
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateLocationDto)
  locations: CreateLocationDto[];

  @ApiProperty({
    description: 'Optional notes about the customer',
    example: 'Important client',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
