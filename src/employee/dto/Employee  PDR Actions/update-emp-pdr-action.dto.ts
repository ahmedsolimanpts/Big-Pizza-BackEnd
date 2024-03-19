import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateEmployeePdrActionDto } from './create-emp-pdr-action.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { PDRActions } from 'src/employee/enums/pdr-action.enum';

export class UpdateEmployeePdrActionDto extends PartialType(
  CreateEmployeePdrActionDto,
) {
  @IsOptional()
  @IsMongoId()
  @IsString()
  @ApiPropertyOptional({
    description: 'The employee ID',
    example: '507f191e810c19729de860ea',
  })
  employee?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'The grade of the employee',
    example: 5,
    type: Number,
  })
  grade?: number;

  @IsOptional()
  @IsString()
  @IsEnum(PDRActions)
  @ApiPropertyOptional({
    description: 'The action to be taken',
    enum: PDRActions,
    example: PDRActions.POSITIVE,
  })
  action?: PDRActions;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'A note about the action',
    example: 'Needs to improve time management skills.',
  })
  note?: string;

  @IsOptional()
  @IsMongoId()
  @IsString()
  @ApiPropertyOptional({
    description: 'The User ID',
    example: '507f191e810c19729de860ea',
  })
  createby?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: 'The date of the action',
    example: '2023-03-19',
    required: false,
    type: String,
  })
  date?: Date;
}
