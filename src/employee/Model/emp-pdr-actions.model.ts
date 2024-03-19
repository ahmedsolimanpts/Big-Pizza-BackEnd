import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { Employee } from './employee.model';
import { PDRActions } from '../enums/pdr-action.enum';

@Schema({ timestamps: true })
export class EmployeePDRAction {
  @Prop({ type: mongoose.Types.ObjectId, ref: Employee.name, required: true })
  employee: string;

  @Prop({ required: true })
  grade: number;

  @Prop({ required: true })
  action: PDRActions;

  @Prop()
  note: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ required: true })
  date: Date;
}

export const EmployeePDRActionSchema =
  SchemaFactory.createForClass(EmployeePDRAction);
