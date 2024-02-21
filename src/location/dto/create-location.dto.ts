import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCordinatesDto {
  @ApiProperty({
    example: '17.1',
    name: 'Longitude',
  })
  @IsLongitude()
  @IsNotEmpty()
  long: number;

  @ApiProperty({
    example: '17.1',
    name: 'Latitude',
  })
  @IsNotEmpty()
  @IsLatitude()
  lat: number;
}

export class CreateLocationDto {
  @ApiProperty({
    example: 'My Home',
    name: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Egypt',
    name: 'country',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: 'Port Said',
    name: 'city',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Madient Nasr',
    name: 'district',
  })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({
    example: 'Obour Area',
    name: 'neighborhood',
  })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({
    example: 'Mohamed Ali Street',
    name: 'street_Address',
  })
  @IsString()
  @IsNotEmpty()
  street_Address: string;

  @ApiProperty({
    example: '3C',
    name: 'building_Number',
  })
  @IsString()
  @IsNotEmpty()
  building_Number: string;

  @ApiProperty({
    example: 'third Or 3th',
    name: 'floor',
  })
  @IsString()
  @IsNotEmpty()
  floor: string;

  @ApiProperty({
    example: 'the building next to the market',
    name: 'description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: CreateCordinatesDto,
    name: 'cordinates',
  })
  @ValidateNested()
  @Type(() => CreateCordinatesDto)
  @IsOptional()
  cordinates: CreateCordinatesDto;
}
