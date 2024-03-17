import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { StockItemQuantity } from './Stock-item-quantity.model';
import { User } from 'src/users/Model/user.model';
import { StockTransactionStatus } from '../enums/Stock-Transaction-Status.enum';

@Schema({ timestamps: true })
export class StockTransaction {
  @Prop({
    type: [StockItemQuantity],
    required: true,
    default: [],
  })
  items_quantity: StockItemQuantity[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' })
  stock: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  createby: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  updated_user: string;

  @Prop({ required: true, default: StockTransactionStatus.INPROGRESS })
  status: StockTransactionStatus;
}

export const StockTransactionSchema =
  SchemaFactory.createForClass(StockTransaction);
