import { CreateSpendingAuthBaseInteface } from '../Create-Spending-Auth-Base.interface';

export interface CreateInvoiceSpendingAuthInteface
  extends CreateSpendingAuthBaseInteface {
  invoice: string;
}
