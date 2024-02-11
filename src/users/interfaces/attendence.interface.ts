import { AttendenceActions } from '../enums/attendence-action.enums';
import { Location } from 'src/common/interfaces/location.interface';

export interface Attendence {
  date: Date;
  action: AttendenceActions;
  location: Location;
  device: string;
}
