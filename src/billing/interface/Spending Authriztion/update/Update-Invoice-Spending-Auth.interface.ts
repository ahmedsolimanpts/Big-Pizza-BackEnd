import { UpdateSpendingAuthBaseInteface } from '../Update-Spending-Auth-Base.interface';

export interface UpdateInvoiceSpendingAuthInteface
  extends UpdateSpendingAuthBaseInteface {
  invoice?: string;
}
