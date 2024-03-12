import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderType } from '../enums/Order-Types.enums';

@Schema()
export class DineinOrder {
  order_type: OrderType = OrderType.DINEIN;

  @Prop({ default: 30 })
  service_price: number;

  @Prop()
  table_number: string;
}

export const DineinOrderSchema = SchemaFactory.createForClass(DineinOrder);
