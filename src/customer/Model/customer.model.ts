import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Location } from 'src/location/Model/location.model';
import * as mongoose from 'mongoose';

@Schema()
export class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string[];

  @Prop({ type: mongoose.Types.ObjectId, ref: Location.name, required: true })
  location: Location[];

  @Prop()
  notes: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
