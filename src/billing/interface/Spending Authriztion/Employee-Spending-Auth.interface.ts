import { SpendingAuthorizationStatus } from 'src/billing/enum/SpendingAuthorization-status.enum';

export interface EmployeeSpendingAuthInteface {
  type: string;
  amount: number;
  employee: string;

  createby: string;

  note?: string;

  status: SpendingAuthorizationStatus;
  releasedby?: string;
}
