import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentType } from '../enums/payment-type.enums';
import { PaymentStatus } from '../enums/payment-status.enums';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, default: PaymentType.CASH })
  payment_type: PaymentType;

  @Prop({ required: true, default: PaymentStatus.PENDING })
  payment_status: PaymentStatus;

  @Prop()
  payment_id: string;

  @Prop()
  amount: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  createby: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
