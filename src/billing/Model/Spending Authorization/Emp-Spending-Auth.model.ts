import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/Model/employee.model';

@Schema()
export class EmployeeSpendingAuthorization {
  type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Employee.name })
  employee: string;
}

export const EmployeeSpendingAuthorizationSchema = SchemaFactory.createForClass(
  EmployeeSpendingAuthorization,
);
