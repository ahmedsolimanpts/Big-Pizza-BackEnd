import { UpdateBasePaymentInterface } from '../Update-Base-Payment.interface';

export interface UpdateCashPaymentInterface extends UpdateBasePaymentInterface {
  branch?: string;
}
