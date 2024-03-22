import { SpendingAuthorizationStatus } from 'src/billing/enum/SpendingAuthorization-status.enum';

export interface InvoiceSpendingAuthInteface {
  type?: string;
  amount?: number;

  invoice?: string;

  createby?: string;

  note?: string;

  status?: SpendingAuthorizationStatus;
  releasedby?: string;
}
