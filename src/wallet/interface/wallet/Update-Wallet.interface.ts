import { PaymentCurrency } from 'src/payment/enums/payment-currency.enum';

export interface UpdateWalletInterface {
  user?: string;

  currency?: PaymentCurrency;
}
