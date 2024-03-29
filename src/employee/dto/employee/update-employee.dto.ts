import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsMongoId,
  IsEnum,
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Sex } from 'src/users/enums/Sex.enum';
import { Department } from '../../enums/department.enums';
import { Location } from 'src/location/Model/location.model';

export class UpdateEmployeeDto {
  @ApiPropertyOptional({
    description: 'The date the employee joined',
    example: '2023-01-01',
  })
  @IsDateString()
  @IsOptional()
  join_at?: Date;

  @ApiPropertyOptional({
    description: 'User MongoDB ID',
    example: '507f191e810c19729de860ea',
  })
  @IsMongoId()
  @IsOptional()
  user?: string;

  @ApiPropertyOptional({
    description: 'Working in Branch MongoDB ID',
    example: '507f191e810c19729de860eb',
  })
  @IsMongoId()
  @IsOptional()
  working_in?: string;

  @ApiPropertyOptional({
    enum: Department,
    description: 'Department the employee works in',
  })
  @IsEnum(Department)
  @IsOptional()
  department?: Department;

  @ApiPropertyOptional({
    description: 'Base salary of the employee',
    example: 50000,
  })
  @IsNumber()
  @IsOptional()
  base_salary?: number;

  @ApiPropertyOptional({
    description: 'Phone numbers',
    example: ['+1234567890'],
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  phones?: string[];

  @ApiPropertyOptional({ enum: Sex, description: 'Gender of the employee' })
  @IsEnum(Sex)
  @IsOptional()
  gender?: Sex;

  @ApiPropertyOptional({
    description: 'Address of the employee',
    type: () => Location,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  address?: Location;

  @ApiPropertyOptional({
    description: 'Social Security ID',
    example: '123-45-6789',
  })
  @IsOptional()
  @IsString()
  ssid?: string;

  @ApiPropertyOptional({
    description: 'Birthdate of the employee',
    example: '1990-01-01',
  })
  @IsDateString()
  @IsOptional()
  birthdate?: Date;

  @ApiPropertyOptional({
    description: 'Bank account number',
    example: '123456789',
  })
  @IsOptional()
  @IsString()
  bank_account?: string;
}
