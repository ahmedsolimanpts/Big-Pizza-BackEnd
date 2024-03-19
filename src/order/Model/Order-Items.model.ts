import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/product/Model/product.model';
import { ProductComponents } from 'src/product/enums/product-components.enum';

@Schema()
export class OrderItems {
  @Prop()
  verbose_name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Product.name })
  product: string;

  @Prop()
  quantity: number;

  @Prop()
  note: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Product.name })
  extra: string[];

  @Prop()
  without_component: ProductComponents[];
}

export const OrderItemsSchema = SchemaFactory.createForClass(OrderItems);
