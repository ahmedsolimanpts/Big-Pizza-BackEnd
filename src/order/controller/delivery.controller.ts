import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { OrderInterface } from '../Interface/Order.interface';
import { DeliveryOrder } from '../Model/Delivery.model';
import { CreateDeliveryOrderDto } from '../dto/delivery/create-delivery-order.dto';
import { OrderService } from '../service/order.service';
import { ApiTags } from '@nestjs/swagger';
import { DeliveryService } from '../service/delivery.service';
import { DeliveryStatus } from 'src/delivery/enums/delivery-status.enums';

@ApiTags('Delivery Order')
@Controller('order/delivery')
export class DeliveryController {
  constructor(
    private readonly orderService: OrderService,
    private readonly deliveryService: DeliveryService,
  ) {}

  @Post(':branchid')
  createDeliveryOrder(
    @Body()
    createOrderDto: CreateDeliveryOrderDto,
    @Param('branchid') branchid: string,
    @Req() req: Request,
  ) {
    const data: OrderInterface = {
      ...createOrderDto,
      branch: branchid,
      order_type: DeliveryOrder.name,
      createby: (req as any).user._id,
    };
    return this.orderService.create(data);
  }

  @Patch('status/receive/:orderid')
  ReciveOrder(@Param('orderid') orderid: string) {
    return this.deliveryService.UpdateDeliveryOrderStatus(
      orderid,
      DeliveryStatus.INDELIVER,
    );
  }

  @Patch('status/compelete/:orderid')
  CompeleteOrder(@Param('orderid') orderid: string) {
    return this.deliveryService.UpdateDeliveryOrderStatus(
      orderid,
      DeliveryStatus.COMPELETED,
    );
  }

  @Patch('status/waiting-customer/:orderid')
  WaitingCustomerStatus(@Param('orderid') orderid: string) {
    return this.deliveryService.UpdateDeliveryOrderStatus(
      orderid,
      DeliveryStatus.WAITINGCUSTOMER,
    );
  }
}
