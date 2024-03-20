import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.model';

@Schema({ timestamps: true })
export class VerifyUserEmail {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: User.name,
    unique: true,
    required: true,
  })
  user: string;

  @Prop({ required: true, unique: true })
  code: number;
}

export const VerifyUserEmailSchema =
  SchemaFactory.createForClass(VerifyUserEmail);
