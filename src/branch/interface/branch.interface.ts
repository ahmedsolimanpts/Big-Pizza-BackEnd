import { Location } from 'src/common/interfaces/location.interface';

export interface BranchInterface {
  name?: string;

  work_from?: Date;

  work_to?: Date;

  manager?: string;

  location?: Location;
}
