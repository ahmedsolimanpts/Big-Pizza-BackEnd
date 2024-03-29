import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Supplier } from './supplier.Model';

@Schema({ timestamps: true })
export class SupplierItems {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Supplier.name, required: true })
  supplier: string;

  @Prop({ required: true })
  price: number;
}

export const SupplierItemsSchema = SchemaFactory.createForClass(SupplierItems);
