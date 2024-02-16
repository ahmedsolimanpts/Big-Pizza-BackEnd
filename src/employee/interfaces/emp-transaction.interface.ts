import { Transaction } from '../enums/emp-transaction.enum';

export interface EmployeeTransactionInterface {
  amount: number;

  transaction: Transaction;

  notes: string;

  createby: string;

  employee_id: string;
}
