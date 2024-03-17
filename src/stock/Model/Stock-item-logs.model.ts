import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { StockTransactionTYPE } from '../enums/Stock-Transactions.enum';
import { StockItemQuantity } from './Stock-item-quantity.model';
import { StockTransaction } from './Stock-Transaction.model';

@Schema({ timestamps: true })
export class StockItemslogs {
  @Prop({ type: StockItemQuantity })
  item: StockItemQuantity;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  createby: string;

  @Prop()
  transaction: StockTransactionTYPE;

  @Prop({ type: mongoose.Types.ObjectId, ref: StockTransaction.name })
  transaction_id: string;
}

export const StockItemslogsSchema =
  SchemaFactory.createForClass(StockItemslogs);
