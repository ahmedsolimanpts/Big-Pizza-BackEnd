import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StockItem {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;
}

export const StockItemSchema = SchemaFactory.createForClass(StockItem);
