import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Attendence,
  AttendenceSchema,
  Employee,
  EmployeePDR,
  EmployeePDRSchema,
  EmployeeSchema,
  EmployeeTransactions,
  EmployeeTransactionsSchema,
} from './Model/employee.model';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Attendence.name, schema: AttendenceSchema },
      { name: EmployeeTransactions.name, schema: EmployeeTransactionsSchema },
      { name: EmployeePDR.name, schema: EmployeePDRSchema },
    ]),
    LocationModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
