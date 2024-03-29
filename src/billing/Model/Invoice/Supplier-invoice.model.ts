import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Supplier } from 'src/supplier/Model/supplier.Model';
import { SupplierInvoiceItem } from './supplier-invoice-items.model';

@Schema()
export class SupplierInvoice {
  type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Supplier.name, required: true })
  supplier: string;

  @Prop({
    required: true,
    type: [SupplierInvoiceItem],
  })
  InvoiceItems: SupplierInvoiceItem[];
}

export const SupplierInvoiceSchema =
  SchemaFactory.createForClass(SupplierInvoice);
