import { IsEnum, IsNotEmpty } from 'class-validator';
import { AccountStatus } from '../enums/account-status.enums';

export class ChangeUserStatusDTO {
  @IsNotEmpty()
  @IsEnum(AccountStatus)
  status: AccountStatus;
}
