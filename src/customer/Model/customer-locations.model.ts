import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Customer } from './customer.model';
import { Location } from 'src/location/Model/location.model';

@Schema()
export class CustomerLocations {
  @Prop({ type: mongoose.Types.ObjectId, ref: Customer.name, required: true })
  customer: string;

  @Prop({ type: [Location], required: true })
  location: Location;
}

export const CustomerLocationsSchema =
  SchemaFactory.createForClass(CustomerLocations);
