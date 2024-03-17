import { PaymentCurrency } from '../enums/payment-currency.enum';
import { PaymentStatus } from '../enums/payment-status.enums';

export interface CreateBasePaymentInterface {
  payment_type: string;

  payment_status: PaymentStatus;

  amount: number;

  order_id: string;

  createby: string;

  currency: PaymentCurrency;
}
