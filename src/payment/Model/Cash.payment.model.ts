import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentType } from '../enums/payment-type.enums';
import mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';

@Schema()
export class CashPayment {
  payment_type: PaymentType = PaymentType.CASH;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Branch.name })
  branch: string;
}

export const CashPaymentSchema = SchemaFactory.createForClass(CashPayment);
