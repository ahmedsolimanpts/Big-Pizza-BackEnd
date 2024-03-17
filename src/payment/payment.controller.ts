import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Req,
  Body,
} from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { ApiTags } from '@nestjs/swagger';
import { CashService } from './service/cash.service';
import { PaypalService } from './service/paypal.service';
import { Request } from 'express';
import { CreateCashPaymentInterface } from './interface/Cash/Create-Cash-Payment.interface';
import { PaymentType } from './enums/payment-type.enums';
import { PaymentStatus } from './enums/payment-status.enums';
import { CreateBasePaymentDto } from './dto/create-base-payment.dto';
import { CreateBasePaymentInterface } from './interface/Create-Base-Payment.interface';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly cashService: CashService,
    private readonly paypalService: PaypalService,
  ) {}

  @Post('cash/:branchid')
  createCash(
    @Param('branchid') branchid: string,
    @Body() data: CreateBasePaymentDto,
    @Req() req: Request,
  ) {
    const newData: CreateCashPaymentInterface = {
      branch: branchid,
      payment_type: PaymentType.CASH,
      payment_status: PaymentStatus.COMPELETED,
      ...data,
      createby: (req as any).user._id,
    };
    return this.cashService.createCashPayment(newData);
  }

  @Post('paypal')
  createPayPal(
    @Param('branchid') branchid: string,
    @Body() data: CreateBasePaymentDto,
    @Req() req: Request,
  ) {
    const newData: CreateBasePaymentInterface = {
      payment_type: PaymentType.PAYPAL,
      payment_status: PaymentStatus.COMPELETED,
      ...data,
      createby: (req as any).user._id,
    };
    return this.paypalService.createPayPalPayment(newData);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.paymentService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
