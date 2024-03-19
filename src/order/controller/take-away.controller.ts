import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { OrderInterface } from '../Interface/Order.interface';
import { TakeAwayOrder } from '../Model/TakeAway.model';
import { CreateTakeAwayOrderDto } from '../dto/takeaway/create-takeaway-order.dto';
import { OrderService } from '../service/order.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TakeAway Order')
@Controller('order/take-away')
export class TakeAwayController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':branchid')
  createTakeAwayOrder(
    @Body()
    createOrderDto: CreateTakeAwayOrderDto,
    @Param('branchid') branchid: string,
    @Req() req: Request,
  ) {
    const data: OrderInterface = {
      ...createOrderDto,
      branch: branchid,
      order_type: TakeAwayOrder.name,
      createby: (req as any).user._id,
    };
    return this.orderService.create(data);
  }
}
