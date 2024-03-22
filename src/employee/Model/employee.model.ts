import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Branch } from 'src/branch/Model/branch.model';
import { User } from 'src/users/Model/user.model';
import { Department } from '../enums/department.enums';
import { Sex } from 'src/users/enums/Sex.enum';
import { Location } from 'src/location/Model/location.model';
import { TicketsPool } from 'src/ticket/enums/Ticket-Pool.enum';

@Schema({ timestamps: true })
export class Employee {
  @Prop()
  join_at: Date;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  user: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Branch.name, required: true })
  working_in: string;

  @Prop({ required: true })
  department: Department;

  @Prop({ required: true })
  base_salary: number;

  @Prop({ required: true })
  phones: string[];

  @Prop({ default: Sex.MALE })
  gender: Sex;

  @Prop({ type: Location })
  addrees: Location;

  @Prop()
  ssid: string;

  @Prop()
  birthdate: Date;

  @Prop()
  bank_account: string;

  @Prop({ required: true, default: TicketsPool.STAFF })
  ticket_pool: TicketsPool;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
