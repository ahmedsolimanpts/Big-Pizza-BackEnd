import { CashierTransaction } from '../enum/cashier-transaction.enum';

export interface CreateCashierShiftInterface {
  amount: number;

  create_by: string;

  transaction: CashierTransaction;
}
