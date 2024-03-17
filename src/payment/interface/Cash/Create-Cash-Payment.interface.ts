import { CreateBasePaymentInterface } from '../Create-Base-Payment.interface';

export interface CreateCashPaymentInterface extends CreateBasePaymentInterface {
  branch: string;
}
