import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Wallet } from './wallet.model';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { WalletTransactionOperation } from '../enum/Wallet-Transaction-Operation.enum';

@Schema({ timestamps: true })
export class WalletTransaction {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Wallet.name, required: true })
  wallet: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  acction: WalletTransactionOperation;
}

export const WalletTransactionSchema =
  SchemaFactory.createForClass(WalletTransaction);
