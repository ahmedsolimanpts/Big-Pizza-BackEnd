import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Delivery } from 'src/delivery/Model/delivery.model';
import { OrderType } from '../enums/Order-Types.enums';

@Schema()
export class DeliveryOrder {
  order_type: OrderType = OrderType.DELIVEREY;

  @Prop({ type: Delivery })
  delivery: Delivery;
}

export const DeliveryOrderSchema = SchemaFactory.createForClass(DeliveryOrder);
