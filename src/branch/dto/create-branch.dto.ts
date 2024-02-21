import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class CreateBranchDto {
  @ApiProperty({
    example: 'Port Said',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '2020-02-20',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  work_from: Date;

  @ApiProperty({
    example: '2020-02-20',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  work_to: Date;

  @ApiProperty({
    example: 'user_id',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  manager: string;

  @ApiProperty({
    // example: ,
    type: CreateLocationDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location?: CreateLocationDto;
}
