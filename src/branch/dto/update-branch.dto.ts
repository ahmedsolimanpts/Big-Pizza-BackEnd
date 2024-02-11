import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @ApiProperty({
    example: 'Port Said',
    required: false,
  })
  @IsOptional()
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
  @IsOptional()
  @IsString()
  manager: string;
}
