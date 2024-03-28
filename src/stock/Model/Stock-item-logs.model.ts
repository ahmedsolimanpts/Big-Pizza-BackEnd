import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { StockTransactionTYPE } from '../enums/Stock-Transactions.enum';
import { StockItemQuantity } from './Stock-item-quantity.model';
import { StockTransaction } from './Stock-Transaction.model';
import { Stock } from './stock.model';

@Schema({ timestamps: true })
export class StockItemslogs {
  @Prop({ type: StockItemQuantity, required: true })
  item: StockItemQuantity;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ required: true })
  transaction: StockTransactionTYPE;

  @Prop({ type: mongoose.Types.ObjectId, ref: StockTransaction.name })
  transaction_id: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Stock.name })
  stock: string;
}

export const StockItemslogsSchema =
  SchemaFactory.createForClass(StockItemslogs);
