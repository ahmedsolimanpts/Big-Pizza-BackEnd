import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { DeliveryStatus } from '../enums/delivery-status.enums';
import { DeliveryPrice } from '../enums/Deliver-price.enums';
import { Location } from 'src/location/Model/location.model';
import { DelivereyMethod } from '../enums/Deliverey-method.enums';

@Schema({ timestamps: true })
export class Delivery {
  @Prop({ required: true, type: Location })
  start_location: Location;

  @Prop({ required: true, type: Location })
  end_location: Location;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  pilot: string;

  @Prop()
  deliverey_method: DelivereyMethod;

  @Prop({ required: true, default: DeliveryStatus.WAITINGORDER })
  status: DeliveryStatus;

  @Prop({ required: true })
  delivery_price: DeliveryPrice;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
