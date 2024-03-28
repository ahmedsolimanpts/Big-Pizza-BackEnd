import { SpendingAuthorizationStatus } from 'src/billing/enum/SpendingAuthorization-status.enum';

export interface UpdateSpendingAuthBaseInteface {
  amount?: number;

  createby?: string;

  note?: string;
  type?: string;

  status?: SpendingAuthorizationStatus;
  releasedby?: string;
}
