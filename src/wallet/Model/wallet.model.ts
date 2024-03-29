import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PaymentCurrency } from 'src/payment/enums/payment-currency.enum';
import { User } from 'src/users/Model/user.model';

@Schema()
export class Wallet {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop({ required: true })
  currency: PaymentCurrency;

  @Prop({ required: true, default: 0 })
  amount: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

WalletSchema.index({ user: 1, currency: 1 }, { unique: true });
