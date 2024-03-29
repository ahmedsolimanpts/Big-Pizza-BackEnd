import { PartialType } from '@nestjs/swagger';
import { CreateWalletDto } from './create-wallet.dto';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaymentCurrency } from 'src/payment/enums/payment-currency.enum';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
  @IsOptional()
  @IsString()
  @IsEnum(PaymentCurrency)
  currency?: PaymentCurrency;

  @IsOptional()
  @IsString()
  @IsMongoId()
  user?: string;
}
