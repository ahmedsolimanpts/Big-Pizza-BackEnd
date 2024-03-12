import { CoordinatesInteface } from 'src/location/interface/Location.interface';
import { AttendenceActions } from '../enums/attendence-action.enums';

export interface AttendenceInterface {
  action?: AttendenceActions;

  location?: CoordinatesInteface;

  signby?: string;

  phone_ip?: string;

  note?: string;
}
