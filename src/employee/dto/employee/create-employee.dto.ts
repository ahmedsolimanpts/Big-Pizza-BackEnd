import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsMongoId,
  IsEnum,
  IsNumber,
  IsString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Sex } from 'src/users/enums/Sex.enum';
import { Department } from '../../enums/department.enums';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'The date the employee joined',
    example: '2023-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  join_at: Date;

  @ApiProperty({
    description: 'User MongoDB ID',
    required: false,
    example: '507f191e810c19729de860ea',
  })
  @IsOptional()
  @IsMongoId()
  user: string;

  @ApiProperty({
    description: 'Working in Branch MongoDB ID',
    example: '507f191e810c19729de860eb',
  })
  @IsNotEmpty()
  @IsMongoId()
  working_in: string;

  @ApiProperty({
    enum: Department,
    description: 'Department the employee works in',
  })
  @IsNotEmpty()
  @IsEnum(Department)
  department: Department;

  @ApiProperty({ description: 'Base salary of the employee', example: 50000 })
  @IsNumber()
  @IsNotEmpty()
  base_salary: number;

  @ApiProperty({
    description: 'Phone numbers',
    example: ['+1234567890'],
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  phones: string[];

  @ApiProperty({ enum: Sex, description: 'Gender of the employee' })
  @IsEnum(Sex)
  @IsNotEmpty()
  gender: Sex;

  @ApiPropertyOptional({
    description: 'Address of the employee',
    type: CreateLocationDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  address?: CreateLocationDto;

  @ApiPropertyOptional({
    description: 'Social Security ID (optional)',
    required: false,
    example: '123-45-6789',
  })
  @IsOptional()
  @IsString()
  ssid?: string;

  @ApiProperty({
    description: 'Birthdate of the employee (optional)',
    example: '1990-01-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  birthdate?: Date;

  @ApiProperty({
    description: 'Bank account number (optional)',
    required: false,
    example: '123456789',
  })
  @IsOptional()
  @IsString()
  bank_account?: string;
}
