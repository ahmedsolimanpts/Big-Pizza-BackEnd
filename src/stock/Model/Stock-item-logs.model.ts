import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { StockTransactionTYPE } from '../enums/Stock-Transactions.enum';
import { StockItemQuantity } from './Stock-item-quantity.model';

@Schema({ timestamps: true })
export class StockItemslogs {
  @Prop({ type: StockItemQuantity })
  item: StockItemQuantity;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  createby: string;

  @Prop()
  transaction: StockTransactionTYPE;
}

export const StockItemslogsSchema =
  SchemaFactory.createForClass(StockItemslogs);
