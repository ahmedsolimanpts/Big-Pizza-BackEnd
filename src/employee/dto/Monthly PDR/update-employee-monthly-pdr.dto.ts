import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateEmployeeMonthlyPdrDTO } from './create-employee-monthly-pdr.dto';

export class UpdateEmployeeMonthlyPDRDTO extends PartialType(
  CreateEmployeeMonthlyPdrDTO,
) {
  @ApiPropertyOptional({
    description:
      'The unique identifier of the employee, must be a valid MongoDB ObjectId',
    example: '507f191e810c19729de860ea',
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  employee?: string;

  @ApiPropertyOptional({
    description:
      'The unique identifier of the User, must be a valid MongoDB ObjectId',
    example: '507f191e810c19729de860ea',
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  createby?: string;

  @ApiPropertyOptional({
    description: 'PDR (Performance Development Review) rating',
    example: 8.5,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  pdr?: number;

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
