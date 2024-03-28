import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';

@Schema({ timestamps: true })
export class Stock {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Branch.name,
    required: true,
    unique: true,
  })
  branch: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
