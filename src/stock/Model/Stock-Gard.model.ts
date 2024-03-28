import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { StockItemQuantity } from './Stock-item-quantity.model';
import { StockItemCategory } from '../enums/Stock-Item-Category.enum';
import { Stock } from './stock.model';

@Schema({ timestamps: true })
export class StockGard {
  @Prop({
    type: [StockItemQuantity],
    required: true,
  })
  items: StockItemQuantity[];

  @Prop({ required: true })
  category: StockItemCategory;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Stock.name, required: true })
  stock: string;
}

export const StockGardSchema = SchemaFactory.createForClass(StockGard);
