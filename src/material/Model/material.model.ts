import { Prop, Schema } from '@nestjs/mongoose';
import { MeasureUnits } from '../enums/measure-units.enum';

@Schema()
export class Material {
  @Prop()
  name: string;

  @Prop({ type: MeasureUnits })
  measure_by: MeasureUnits;
}
