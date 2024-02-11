import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentType } from '../enums/payment-type.enums';
import { PaymentStatus } from '../enums/payment-status.enums';

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, default: PaymentType.CASH })
  payment_type: PaymentType;

  @Prop({ required: true, default: PaymentStatus.PENDING })
  payment_status: PaymentStatus;

  @Prop()
  payment_id: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
