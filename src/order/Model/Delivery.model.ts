import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderType } from '../enums/Order-Types.enums';
import { DeliveryPrice } from 'src/delivery/enums/Deliver-price.enums';
import { DeliveryStatus } from 'src/delivery/enums/delivery-status.enums';
import mongoose from 'mongoose';
import { CustomerLocations } from 'src/customer/Model/customer-locations.model';
import { DelivereyMethod } from 'src/delivery/enums/Deliverey-method.enums';
import { User } from 'src/users/Model/user.model';

@Schema()
export class DeliveryOrder {
  order_type: OrderType = OrderType.DELIVEREY;

  @Prop({ required: true, default: DeliveryPrice.TWENTY })
  delivery_price: DeliveryPrice;

  @Prop({ required: true, default: DeliveryStatus.WAITINGORDER })
  delivery_status: DeliveryStatus;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: CustomerLocations.name,
  })
  end_location: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  pilot: string;

  @Prop()
  deliverey_method: DelivereyMethod;
}

export const DeliveryOrderSchema = SchemaFactory.createForClass(DeliveryOrder);
