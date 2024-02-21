import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import { Product } from 'src/product/Model/product.model';

@Schema()
export class Offer {
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

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Product.name })
  items: string[];

  @Prop({ required: true })
  price: number;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
