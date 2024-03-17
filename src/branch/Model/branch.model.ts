import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Location } from 'src/location/Model/location.model';
import { User } from 'src/users/Model/user.model';

@Schema({ timestamps: true })
export class Branch {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date })
  work_from: Date;

  @Prop({ type: Date })
  work_to: Date;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  manager: string;

  @Prop({ type: Location })
  location: Location;
}
export const BranchSchema = SchemaFactory.createForClass(Branch);
