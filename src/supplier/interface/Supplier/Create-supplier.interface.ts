import { LocationInterface } from 'src/location/interface/Location.interface';

export interface CreateSupplierInterface {
  name: string;

  phones?: string[];

  location?: LocationInterface;
}
