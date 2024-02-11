import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AttendenceActions } from '../enums/attendence-action.enums';
import { Location } from 'src/common/interfaces/location.interface';

export class AdminAttendenceDto {
  @IsNotEmpty()
  @IsString()
  userid: string;
  @IsDate()
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
