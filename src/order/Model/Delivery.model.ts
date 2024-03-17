import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Delivery } from 'src/delivery/Model/delivery.model';
import { OrderType } from '../enums/Order-Types.enums';
import { DeliveryPrice } from 'src/delivery/enums/Deliver-price.enums';
import { DeliveryStatus } from 'src/delivery/enums/delivery-status.enums';

@Schema()
export class DeliveryOrder {
  order_type: OrderType = OrderType.DELIVEREY;

  @Prop({ type: Delivery })
  delivery: Delivery;

  @Prop({ required: true, default: DeliveryPrice.TWENTY })
  delivery_price: DeliveryPrice;

  @Prop({ required: true, default: DeliveryStatus.WAITINGORDER })
  delivery_status: DeliveryStatus;
}

export const DeliveryOrderSchema = SchemaFactory.createForClass(DeliveryOrder);
