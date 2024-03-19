import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { UpdateLocationDto } from 'src/location/dto/update-location.dto';

export class UpdateCustomerLocationDto {
  @IsMongoId()
  @IsOptional()
  @IsString()
  customer?: string;

  @ApiProperty({
    description: 'The locations associated with the customer',
    type: [CreateLocationDto],
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateLocationDto)
  @IsOptional()
  @ArrayMinSize(1)
  @IsArray()
  location?: UpdateLocationDto;
}
