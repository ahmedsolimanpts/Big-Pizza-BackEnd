import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PaymentCurrency } from 'src/payment/enums/payment-currency.enum';

export class CreateWalletTransactionDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentCurrency)
  currency: PaymentCurrency;
}
