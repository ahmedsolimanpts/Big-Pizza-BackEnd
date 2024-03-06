import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import { StockItemslogs } from './Stock-item-logs.model';
import { StockGard } from './Stock-Gard.model';

@Schema({ timestamps: true })
export class Stock {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Branch.name,
    required: true,
    unique: true,
  })
  branch: string;

  @Prop({ type: [StockItemslogs] })
  items: StockItemslogs[];

  @Prop({ type: [StockGard] })
  gard: StockGard[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);
