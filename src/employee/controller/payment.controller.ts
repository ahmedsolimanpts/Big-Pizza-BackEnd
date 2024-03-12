import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { EmployeeTransactionDto } from '../dto/emp-transaction.dto';
import { Transaction } from '../enums/emp-transaction.enum';
import { EmployeeTransactionInterface } from '../interfaces/emp-transaction.interface';

@Controller('employee-payment')
export class PaymentController {
  constructor(private empPaymentService: PaymentService) {}

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

    return this.empPaymentService.addEmployeeTransaction(data);
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

    return this.empPaymentService.addEmployeeTransaction(data);
  }

  @Delete(':employeeid/:transactionid')
  removeTransaction(
    @Param('transactionid') transactionid: string,
    @Param('employeeid') employeeid: string,
  ) {
    return this.empPaymentService.removeEmployeeTransaction(
      employeeid,
      transactionid,
    );
  }
}
