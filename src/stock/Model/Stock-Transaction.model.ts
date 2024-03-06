import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';
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
  stock_items: StockItemQuantity[];

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name, required: true })
  transfer_to: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ required: true, default: StockTransactionStatus.INPROGRESS })
  status: StockTransactionStatus;
}

export const StockTransactionSchema =
  SchemaFactory.createForClass(StockTransaction);
