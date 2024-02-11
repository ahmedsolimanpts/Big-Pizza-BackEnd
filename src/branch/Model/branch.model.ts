import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';

@Schema({ timestamps: true })
export class Branch {
  @Prop()
  name: string;

  @Prop()
  work_from: Date;

  @Prop()
  work_to: Date;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  manager: string;
}
export const BranchSchema = SchemaFactory.createForClass(Branch);
