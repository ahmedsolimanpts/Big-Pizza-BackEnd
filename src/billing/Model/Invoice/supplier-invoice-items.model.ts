import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SupplierItems } from 'src/supplier/Model/Supplier-Items.model';

@Schema({ timestamps: true })
export class SupplierInvoiceItem {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: SupplierItems.name,
    required: true,
  })
  item: string;

  @Prop({ required: true })
  quantity: number;
}

export const SupplierInvoiceItemSchema =
  SchemaFactory.createForClass(SupplierInvoiceItem);
