import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentType } from '../enums/payment-type.enums';

@Schema()
export class PayPalPayment {
  payment_type: PaymentType = PaymentType.PAYPAL;

  @Prop({ required: true, unique: true })
  payment_id: string;
}

export const PayPalPaymentSchema = SchemaFactory.createForClass(PayPalPayment);
