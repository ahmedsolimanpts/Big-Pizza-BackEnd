import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { StockItem } from './Stock-Item.model';

@Schema()
export class StockItemQuantity {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: StockItem.name,
    unique: true,
    required: true,
  })
  stock_item: string;

  @Prop({ required: true })
  quantity: number;
}

export const StockItemQuantitySchema =
  SchemaFactory.createForClass(StockItemQuantity);
