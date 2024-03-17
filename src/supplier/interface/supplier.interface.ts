import { LocationInterface } from 'src/location/interface/Location.interface';

export interface SupplierInterface {
  name?: string;

  phones?: string[];

  location?: LocationInterface;
}
