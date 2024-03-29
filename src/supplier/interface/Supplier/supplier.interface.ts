import { LocationInterface } from 'src/location/interface/Location.interface';

export interface UpdateSupplierInterface {
  name?: string;

  phones?: string[];

  location?: LocationInterface;
}
