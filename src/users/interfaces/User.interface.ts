import { Roles } from 'src/auth/enums/roles.enums';
import { AccountStatus } from '../enums/account-status.enums';

export interface UserInterface {
  username?: string;

  email?: string;

  password?: string;

  roles?: Roles[];

  refreshToken?: string;

  status?: AccountStatus;
}
