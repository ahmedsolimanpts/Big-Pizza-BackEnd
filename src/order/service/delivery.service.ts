import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../Model/order.model';
import { DeliveryStatus } from 'src/delivery/enums/delivery-status.enums';
import { OrderStatus } from '../enums/Order-Status.enums';
import { DeliveryOrder } from '../Model/Delivery.model';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Order.name) private readonly orderRepo: Model<Order>,
  ) {}

  async UpdateDeliveryOrderStatus(order_id: string, newStatus: DeliveryStatus) {
    try {
      const order = await this.orderRepo.findById(order_id);
      if (!order) throw new NotFoundException('Order Not Exist');
      if ((order as any).delivery_status == newStatus)
        throw new ConflictException('Status Already Set');
      if (
        order.order_status == OrderStatus.COMPELETED &&
        order.order_type == DeliveryOrder.name
      ) {
        (order as any).delivery_status = newStatus;
        return await order.save();
      }
    } catch (err) {
      throw err;
    }
  }
}
