import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Invoice } from '../Invoice/Invoice.model';

@Schema()
export class InvoiceSpendingAuthorization {
  type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Invoice.name })
  invoice: string;
}

export const InvoiceSpendingAuthorizationSchema = SchemaFactory.createForClass(
  InvoiceSpendingAuthorization,
);
