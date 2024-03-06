import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Location } from 'src/location/Model/location.model';

@Schema({ timestamps: true })
export class Supplier {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  phones: string[];

  @Prop({ type: Location })
  location: Location;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
