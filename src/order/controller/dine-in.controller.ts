import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { OrderInterface } from '../Interface/Order.interface';
import { DineinOrder } from '../Model/DineIn.model';
import { CreateDineInOrderDto } from '../dto/dinein/create-dinein-order.dto';
import { OrderService } from '../service/order.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('DineIn Order')
@Controller('order/dine-in')
export class DineInController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':branchid')
  createDineInOrder(
    @Body()
    createOrderDto: CreateDineInOrderDto,

    @Param('branchid') branchid: string,
    @Req() req: Request,
  ) {
    const data: OrderInterface = {
      ...createOrderDto,
      branch: branchid,
      order_type: DineinOrder.name,
      createby: (req as any).user._id,
    };
    return this.orderService.create(data);
  }
}
