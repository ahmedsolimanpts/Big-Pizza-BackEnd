import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeMonthlyPdrDTO {
  @ApiProperty({
    description:
      'The unique identifier of the employee, must be a valid MongoDB ObjectId',
    example: '507f191e810c19729de860ea',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  employee: string;

  @ApiProperty({
    description: 'PDR (Performance Development Review) rating',
    example: 8.5,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  pdr: number;

  @ApiPropertyOptional({
    description: 'Additional details regarding the PDR',
    example:
      'Exceeded expectations in project management and leadership skills.',
  })
  @IsOptional()
  @IsString()
  details?: string;

  @ApiPropertyOptional({
    description: 'Date of the PDR',
    example: '2024-03-19',
    type: Date,
  })
  @IsOptional()
  @IsDateString()
  date?: Date;
}
