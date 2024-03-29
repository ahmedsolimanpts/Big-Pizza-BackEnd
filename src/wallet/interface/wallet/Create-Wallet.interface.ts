import { PaymentCurrency } from 'src/payment/enums/payment-currency.enum';

export interface CreateWalletInterface {
  user: string;

  currency: PaymentCurrency;
}
