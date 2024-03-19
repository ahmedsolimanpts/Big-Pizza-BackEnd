import { Module } from '@nestjs/common';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from 'src/location/location.module';
import { AttendenceService } from './service/attendence.service';
import { PdrService } from './service/monthly-pdr.service';
import { AttendenceController } from './controller/attendence.controller';
import { PdrController } from './controller/employee-monthly-pdr.controller';
import {
  EmployeeMonthlyPDR,
  EmployeeMonthlyPDRSchema,
} from './Model/emp-monthly-pdr.model';
import { Attendence, AttendenceSchema } from './Model/attendence.model';
import { Employee, EmployeeSchema } from './Model/employee.model';
import {
  EmployeePDRAction,
  EmployeePDRActionSchema,
} from './Model/emp-pdr-actions.model';
import { EmpPdrActionService } from './service/employee-pdr-action.service';
import { EmpPdrActionController } from './controller/emp-pdr-action.controller';
import { UsersModule } from 'src/users/users.module';
import { BranchModule } from 'src/branch/branch.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Attendence.name, schema: AttendenceSchema },
      { name: EmployeeMonthlyPDR.name, schema: EmployeeMonthlyPDRSchema },
      { name: EmployeePDRAction.name, schema: EmployeePDRActionSchema },
    ]),
    LocationModule,
    UsersModule,
    BranchModule,
  ],
  controllers: [
    EmployeeController,
    AttendenceController,
    PdrController,
    EmpPdrActionController,
  ],
  providers: [
    EmployeeService,
    AttendenceService,
    PdrService,
    EmpPdrActionService,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
