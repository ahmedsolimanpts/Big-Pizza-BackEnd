import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class CreateCustomerLocationDto {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  customer: string;

  @ApiProperty({
    description: 'The locations associated with the customer',
    type: [CreateLocationDto],
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateLocationDto)
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsArray()
  location: CreateLocationDto;
}
