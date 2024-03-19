import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PDRActions } from 'src/employee/enums/pdr-action.enum';

export class CreateEmployeePdrActionDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  @ApiProperty({
    description: 'The employee ID',
    example: '507f191e810c19729de860ea',
  })
  employee: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The grade of the employee',
    example: 5,
    type: Number,
  })
  grade: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(PDRActions)
  @ApiProperty({
    description: 'The action to be taken',
    enum: PDRActions,
    example: PDRActions.POSITIVE,
  })
  action: PDRActions;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'A note about the action',
    example: 'Needs to improve time management skills.',
  })
  note: string;

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
