import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCordinatesDto, CreateLocationDto } from './create-location.dto';
import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsOptional,
  //   IsLongitude,
  //   IsLatitude,
} from 'class-validator';

// class UpdateCordinatesDto extends PartialType(CreateCordinatesDto) {
//   @IsOptional()
//   @IsLongitude()
//   long?: number;

//   @IsOptional()
//   @IsLatitude()
//   lat?: number;
// }

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @ApiProperty({
    example: 'My Home',
    name: 'name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Egypt',
    name: 'country',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    example: 'Port Said',
    name: 'city',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: 'Madient Nasr',
    name: 'district',
  })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty({
    example: 'Obour Area',
    name: 'neighborhood',
  })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({
    example: 'Mohamed Ali Street',
    name: 'street_Address',
  })
  @IsString()
  @IsOptional()
  street_Address?: string;

  @ApiProperty({
    example: '3C',
    name: 'building_Number',
  })
  @IsString()
  @IsOptional()
  building_Number?: string;

  @ApiProperty({
    example: 'third Or 3th',
    name: 'floor',
  })
  @IsString()
  @IsOptional()
  floor?: string;

  @ApiProperty({
    example: 'the building next to the market',
    name: 'description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: CreateCordinatesDto,
    name: 'cordinates',
  })
  @ValidateNested()
  @Type(() => CreateCordinatesDto)
  @IsOptional()
  cordinates?: CreateCordinatesDto;
}
