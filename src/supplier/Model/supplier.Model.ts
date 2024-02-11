import { Prop, Schema } from '@nestjs/mongoose';
import { Location } from 'src/common/interfaces/location.interface';

@Schema({ timestamps: true })
export class Supplier {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  location: Location;
}
