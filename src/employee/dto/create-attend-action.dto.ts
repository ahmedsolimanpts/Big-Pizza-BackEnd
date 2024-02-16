import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { AttendenceActions } from '../enums/attendence-action.enums';

export class CreateAttendActionDTO {
  @IsMongoId()
  @IsNotEmpty()
  employee_id: string;
  @IsEnum(AttendenceActions)
  @IsNotEmpty()
  action: AttendenceActions;

  location: string;
  phone: string;
}
