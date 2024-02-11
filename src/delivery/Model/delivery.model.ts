import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { DeliveryStatus } from '../enums/delivery-status.enums';
import { DeliveryPrice } from '../enums/Deliver-price.enums';
import { Location } from 'src/location/Model/location.model';

@Schema({ timestamps: true })
export class DeliveryOrder {
  @Prop({ required: true })
  start_location: Location;

  @Prop({ required: true })
  end_location: Location;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  pilot: User;

  @Prop({ required: true, default: DeliveryStatus.WAITINGORDER })
  status: DeliveryStatus;

  @Prop({ required: true })
  delivery_price: DeliveryPrice;
}

export const DeliveryOrderSchema = SchemaFactory.createForClass(DeliveryOrder);
