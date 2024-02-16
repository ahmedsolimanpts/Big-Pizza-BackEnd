import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateAttendActionDTO } from './dto/create-attend-action.dto';
import { Request } from 'express';
import { EmployeeTransactionDto } from './dto/emp-transaction.dto';
import { Transaction } from './enums/emp-transaction.enum';
import { EmployeeTransactionInterface } from './interfaces/emp-transaction.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.employeeService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }

  @Post('attend')
  addAttend(@Body() createDto: CreateAttendActionDTO, @Req() req: Request) {
    return this.employeeService.AddEmployeeAttendAction(
      (req as any).user._id,
      createDto,
    );
  }

  @Post('loan/:id')
  addLoan(
    @Param('id') id: string,
    @Body() createDto: EmployeeTransactionDto,
    @Req() req: Request,
  ) {
    const data: EmployeeTransactionInterface = {
      amount: createDto.amount,
      notes: createDto.notes,
      employee_id: id,
      transaction: Transaction.LOAN,
      createby: (req as any).user._id,
    };

    return this.employeeService.addEmployeeTransaction(data);
  }

  @Post('bonas/:id')
  addBonas(
    @Param('id') id: string,
    @Body() createDto: EmployeeTransactionDto,
    @Req() req: Request,
  ) {
    const data: EmployeeTransactionInterface = {
      amount: createDto.amount,
      notes: createDto.notes,
      employee_id: id,
      transaction: Transaction.BONAS,
      createby: (req as any).user._id,
    };

    return this.employeeService.addEmployeeTransaction(data);
  }

  @Delete('transaction/:employeeid/:transactionid')
  removeTransaction(
    @Param('transactionid') transactionid: string,
    @Param('employeeid') employeeid: string,
  ) {
    return this.employeeService.removeEmployeeTransaction(
      employeeid,
      transactionid,
    );
  }

  @Delete('attendance/:employeeid/:attendanceid')
  removeAttend(
    @Param('employeeid') employeeid: string,
    @Param('attendanceid') AttendenceId: string,
  ) {
    return this.employeeService.removeEmployeeAttendAction(
      employeeid,
      AttendenceId,
    );
  }
}
