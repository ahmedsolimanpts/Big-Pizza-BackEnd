import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/Model/employee.model';
import { Transaction } from 'src/billing/enum/emp-transaction.enum';
import { User } from 'src/users/Model/user.model';

@Schema({ timestamps: true })
export class EmployeeTransactions {
  @Prop({ type: mongoose.Types.ObjectId, ref: Employee.name })
  emplpyee: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  createby: string;

  @Prop({ required: true })
  transaction: Transaction;

  @Prop()
  notes: string;
}

export const EmployeeTransactionsSchema =
  SchemaFactory.createForClass(EmployeeTransactions);
