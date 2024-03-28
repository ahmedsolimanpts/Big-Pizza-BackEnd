import { SpendingAuthorizationStatus } from 'src/billing/enum/SpendingAuthorization-status.enum';

export interface CreateSpendingAuthBaseInteface {
  type: string;
  amount: number;

  createby: string;

  note?: string;

  status: SpendingAuthorizationStatus;
}
