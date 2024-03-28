import { CashierTransaction } from '../enum/cashier-transaction.enum';

export interface UpdateCashierShiftInterface {
  amount?: number;

  create_by?: string;

  transaction?: CashierTransaction;
}
