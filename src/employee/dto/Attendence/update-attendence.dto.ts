import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIP,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AttendenceActions } from 'src/employee/enums/attendence-action.enums';
import { CreateCordinatesDto } from 'src/location/dto/create-location.dto';

export class UpdateAttendenceDTO {
  @ApiPropertyOptional({ description: 'The unique identifier of the employee' })
  @IsMongoId()
  @IsOptional()
  employee?: string;

  @ApiPropertyOptional({
    description: 'Action taken for attendance',
    enum: AttendenceActions,
  })
  @IsEnum(AttendenceActions)
  @IsOptional()
  action?: AttendenceActions;

  @ApiPropertyOptional({
    description: 'Location details',
    type: CreateCordinatesDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCordinatesDto)
  location?: CreateCordinatesDto;

  @ApiPropertyOptional({ description: 'IP address of the phone' })
  @IsOptional()
  @IsIP()
  @IsString()
  phone_ip?: string;

  @ApiPropertyOptional({
    description: 'Identifier of the person signing the attendance',
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  signby?: string;

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsOptional()
  @IsString()
  note?: string;
}
