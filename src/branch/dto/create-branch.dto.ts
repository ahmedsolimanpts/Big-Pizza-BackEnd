import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
}
