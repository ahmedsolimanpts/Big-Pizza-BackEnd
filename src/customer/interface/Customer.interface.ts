import { LocationInterface } from 'src/location/interface/Location.interface';

export interface CustomerInterface {
  name?: string;

  user?: string;

  phone?: string[];

  locations?: LocationInterface[];

  notes?: string;
}
