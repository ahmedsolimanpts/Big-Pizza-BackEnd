import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';

@Schema()
export class Coupon {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name, required: true })
  branches: string[];

  @Prop({ type: Date })
  from: Date;

  @Prop({ type: Date })
  to: Date;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  percent_discount: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
