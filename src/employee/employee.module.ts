import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Attendence,
  AttendenceSchema,
  Employee,
  EmployeeSchema,
  EmployeeTransactions,
  EmployeeTransactionsSchema,
} from './Model/employee.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Attendence.name, schema: AttendenceSchema },
      { name: EmployeeTransactions.name, schema: EmployeeTransactionsSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
