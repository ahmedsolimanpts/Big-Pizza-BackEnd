import { Controller, Get, Param } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { Public } from 'src/auth/decorator/IsPuplic.decorator';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Public()
  @Get('pay')
  async pay() {
    return await this.paypalService.createPayment('10.00'); // Example amount
  }

  @Public()
  @Get(':orderid')
  async token(@Param('orderid') orderid: string) {
    return await this.paypalService.captureOrder(orderid);
  }
}
