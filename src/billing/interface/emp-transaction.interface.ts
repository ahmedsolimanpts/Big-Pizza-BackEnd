import { Transaction } from '../enum/emp-transaction.enum';

export interface EmployeeTransactionInterface {
  amount: number;

  transaction: Transaction;

  notes?: string;

  createby: string;

  employee: string;
}
