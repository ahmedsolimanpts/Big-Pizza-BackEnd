import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
class Coordinates {
  @Prop({ required: true })
  long: number;

  @Prop({ required: true })
  lat: number;
}

const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);

@Schema()
export class Location {
  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  district: string;

  @Prop()
  neighborhood: string;

  @Prop()
  street_Address: string;

  @Prop()
  building_Number: string;

  @Prop()
  floor: string;

  @Prop()
  description: string;

  @Prop({ type: CoordinatesSchema })
  cordinates: Coordinates;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
