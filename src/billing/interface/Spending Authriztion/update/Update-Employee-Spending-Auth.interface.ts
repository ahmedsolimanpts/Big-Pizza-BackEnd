import { UpdateSpendingAuthBaseInteface } from '../Update-Spending-Auth-Base.interface';

export interface UpdateEmployeeSpendingAuthInteface
  extends UpdateSpendingAuthBaseInteface {
  employee?: string;
}
