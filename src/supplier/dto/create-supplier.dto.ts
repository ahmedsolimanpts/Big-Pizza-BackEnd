import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class CreateSupplierDto {
  @ApiProperty({ description: 'Name of the supplier', example: 'ABC Supplies' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Contact phone numbers for the supplier',
    example: ['+1234567890', '+0987654321'],
    type: [String],
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  phones: string[];

  @ApiPropertyOptional({
    description: 'Location of the supplier',
    type: () => CreateLocationDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location?: CreateLocationDto;
}
