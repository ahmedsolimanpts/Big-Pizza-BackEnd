import { PartialType } from '@nestjs/swagger';
import { CreateWalletTransactionDto } from './create-wallet-transaction.dto';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaymentCurrency } from 'src/payment/enums/payment-currency.enum';

export class UpdateWalletDto extends PartialType(CreateWalletTransactionDto) {
  @IsOptional()
  @IsString()
  @IsEnum(PaymentCurrency)
  currency?: PaymentCurrency;

  @IsOptional()
  @IsString()
  @IsMongoId()
  user?: string;
}
