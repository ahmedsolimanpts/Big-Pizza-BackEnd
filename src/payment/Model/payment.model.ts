import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentType } from '../enums/payment-type.enums';
import { PaymentStatus } from '../enums/payment-status.enums';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { PayPalPayment } from './PayPal.payment.model';
import { Order } from 'src/order/Model/order.model';
import { PaymentCurrency } from '../enums/payment-currency.enum';
import { CashPayment } from './Cash.payment.model';

@Schema({ timestamps: true, discriminatorKey: 'payment_type' })
export class Payment {
  @Prop({
    required: true,
    default: PaymentType.CASH,
    enum: [PayPalPayment.name, CashPayment.name],
  })
  payment_type: string;

  @Prop({ required: true, default: PaymentStatus.PENDING })
  payment_status: PaymentStatus;

  @Prop()
  amount: number;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Order.name,
    unique: true,
    required: true,
  })
  order_id: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  createby: string;

  @Prop({ default: PaymentCurrency.EG })
  currency: PaymentCurrency;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
