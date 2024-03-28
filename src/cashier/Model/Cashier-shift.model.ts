import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { CashierTransaction } from '../enum/cashier-transaction.enum';

@Schema({ timestamps: true })
export class CashierShift {
  @Prop({ required: true })
  amount: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  create_by: string;

  @Prop({ required: true })
  transaction: CashierTransaction;
}

export const CashierShiftSchema = SchemaFactory.createForClass(CashierShift);
