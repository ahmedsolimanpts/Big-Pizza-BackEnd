import {
  IsEnum,
  IsIP,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AttendenceActions } from '../../enums/attendence-action.enums';
import { Type } from 'class-transformer';
import { CreateCordinatesDto } from 'src/location/dto/create-location.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAttendenceDTO {
  @ApiProperty({ description: 'The unique identifier of the employee' })
  @IsMongoId()
  @IsNotEmpty()
  employee: string;

  @ApiProperty({
    description: 'Action taken for attendance',
    enum: AttendenceActions,
  })
  @IsEnum(AttendenceActions)
  @IsNotEmpty()
  action: AttendenceActions;

  @ApiProperty({ description: 'Location details', type: CreateCordinatesDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCordinatesDto)
  location: CreateCordinatesDto;

  @ApiProperty({ description: 'IP address of the phone' })
  @IsNotEmpty()
  @IsIP()
  @IsString()
  phone_ip: string;

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsOptional()
  @IsString()
  note?: string;
}
