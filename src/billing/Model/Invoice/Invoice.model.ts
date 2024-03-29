import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import { User } from 'src/users/Model/user.model';

@Schema({ timestamps: true, discriminatorKey: 'type' })
export class Invoice {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name, required: true })
  branch: string;

  @Prop()
  note: string;

  @Prop()
  fees: number;

  @Prop()
  tax: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
