import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { StockItemQuantity } from './Stock-item-quantity.model';

@Schema({ timestamps: true })
export class StockGard {
  @Prop({
    type: [StockItemQuantity],
  })
  items: StockItemQuantity[];

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;
}

export const StockGardSchema = SchemaFactory.createForClass(StockGard);
