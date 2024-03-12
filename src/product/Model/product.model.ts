import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import * as mongoose from 'mongoose';
import { ProductCategory } from '../enums/product-category.enums';
import { ProductSubCategory } from '../enums/product-subcategory.enum';
import { ProductSize } from '../enums/size.enum';
import { ProductComponents } from '../enums/product-components.enum';

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  production_price: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name })
  branch: string;

  @Prop()
  category: ProductCategory;

  @Prop()
  subcategory: ProductSubCategory;

  @Prop()
  size: ProductSize;

  @Prop()
  components: ProductComponents[];

  @Prop()
  images: string[];

  @Prop({ default: 10, required: true })
  quantity: number;

  @Prop({ default: true })
  can_deliver: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
