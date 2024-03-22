import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StockItemCategory } from '../enums/Stock-Item-Category.enum';

@Schema()
export class StockItem {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  category: StockItemCategory;

  @Prop()
  description: string;
}

export const StockItemSchema = SchemaFactory.createForClass(StockItem);
