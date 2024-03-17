import { UpdateBasePaymentInterface } from '../Update-Base-Payment.interface';

export interface UpdatePayPalPaymentInterface
  extends UpdateBasePaymentInterface {
  payment_id?: string;
}
