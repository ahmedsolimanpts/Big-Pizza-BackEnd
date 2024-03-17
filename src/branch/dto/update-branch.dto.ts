import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';
import {
  IsOptional,
  IsString,
  IsDateString,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @ApiProperty({
    example: 'Port Said',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '2020-02-20',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  work_from?: Date;

  @ApiProperty({
    example: '2020-02-20',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  work_to?: Date;

  @ApiProperty({
    example: 'user_id',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  @IsString()
  manager?: string;

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
