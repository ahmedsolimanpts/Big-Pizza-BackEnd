import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CashierCreateOrderDto } from './dto/cashier-create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('cashier')
  createOrderByCahier(
    @Body() createOrderDto: CashierCreateOrderDto,
    @Req() req: any,
  ) {
    return this.orderService.createOrderByCashier(req.user, createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
