import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';

@Schema()
export class Customer {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  user: string;

  @Prop({ required: true })
  phone: string[];

  @Prop()
  notes: string;

  @Prop()
  notification_phone: string;

  @Prop()
  notification_email: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
