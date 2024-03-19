import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/Model/user.model';
import { Employee } from './employee.model';

@Schema({ timestamps: true })
export class EmployeeMonthlyPDR {
  @Prop({ type: mongoose.Types.ObjectId, ref: Employee.name })
  employee: string;

  @Prop({ required: true })
  pdr: number;

  @Prop()
  details: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  createby: string;

  @Prop({ required: true, unique: true })
  date: Date;
}

export const EmployeeMonthlyPDRSchema =
  SchemaFactory.createForClass(EmployeeMonthlyPDR);
