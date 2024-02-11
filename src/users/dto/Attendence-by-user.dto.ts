import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AttendenceActions } from '../enums/attendence-action.enums';
import { Location } from 'src/common/interfaces/location.interface';

export class EmpAttendenceDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsEnum(AttendenceActions)
  action: AttendenceActions;

  @IsNotEmpty()
  location: Location;

  @IsNotEmpty()
  @IsString()
  device: string;
}
