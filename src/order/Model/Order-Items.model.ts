import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/product/Model/product.model';
import { ProductComponents } from 'src/product/enums/product-components.enum';

@Schema()
export class OrderItems {
  @Prop()
  verbose_name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Product.name })
  item: string;

  @Prop()
  quantity: number;

  @Prop()
  note: string;

  @Prop()
  extra: Product[];

  @Prop()
  without_component: ProductComponents[];
}
