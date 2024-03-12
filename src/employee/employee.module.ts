import { Module } from '@nestjs/common';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';
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
import { AttendenceService } from './service/attendence.service';
import { PdrService } from './service/pdr.service';
import { PaymentService } from './service/payment.service';
import { AttendenceController } from './controller/attendence.controller';
import { PdrController } from './controller/pdr.controller';
import { PaymentController } from './controller/payment.controller';

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
  controllers: [EmployeeController, AttendenceController, PdrController, PaymentController],
  providers: [EmployeeService, AttendenceService, PdrService, PaymentService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
