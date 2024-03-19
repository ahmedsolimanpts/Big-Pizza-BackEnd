import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Coordinates } from 'src/location/Model/location.model';
import { User } from 'src/users/Model/user.model';
import { AttendenceActions } from '../enums/attendence-action.enums';
import { Employee } from './employee.model';

@Schema({ timestamps: true })
export class Attendence {
  @Prop({ type: mongoose.Types.ObjectId, ref: Employee.name, required: true })
  employee: string;

  @Prop({ required: true })
  action: AttendenceActions;

  @Prop({ type: Coordinates })
  location: Coordinates;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  signby: string;

  @Prop()
  phone_ip: string;

  @Prop()
  note: string;
}

export const AttendenceSchema = SchemaFactory.createForClass(Attendence);
