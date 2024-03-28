import { CreateSpendingAuthBaseInteface } from '../Create-Spending-Auth-Base.interface';

export interface CreateEmployeeSpendingAuthInteface
  extends CreateSpendingAuthBaseInteface {
  employee: string;
}
