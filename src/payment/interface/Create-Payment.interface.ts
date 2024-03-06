import { PaymentStatus } from '../enums/payment-status.enums';
import { PaymentType } from '../enums/payment-type.enums';

export interface CreatePaymentInterface {
  payment_type: PaymentType;

  payment_status: PaymentStatus;

  payment_id: string;

  amount: number;

  createby: string;
}
