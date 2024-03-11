import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Location } from 'src/location/Model/location.model';
import { User } from 'src/users/Model/user.model';

@Schema()
export class Customer {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  user: string;

  @Prop({ required: true })
  phone: string[];

  @Prop({ type: [Location], required: true, default: [] })
  locations: Location[];

  @Prop()
  notes: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
