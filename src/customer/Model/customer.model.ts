import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Location } from 'src/location/Model/location.model';

@Schema()
export class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string[];

  @Prop({ type: [Location], required: true, default: [] })
  location: Location[];

  @Prop()
  notes: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
