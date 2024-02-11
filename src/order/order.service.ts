import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './Model/order.model';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/Model/user.model';
import { OrderStatus } from './enums/Order-Status.enums';
import { AgentCreateOrderDto } from './dto/agent-create-order.dto';
import { CashierCreateOrderDto } from './dto/cashier-create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderRepo: Model<Order>,
  ) {}
  async createOrderByCashier(
    user: User,
    createOrderDto: CashierCreateOrderDto,
  ) {
    const order = new this.orderRepo(createOrderDto);
    order.approvedby = user._id;
    order.createby = user._id;
    order.order_status = OrderStatus.PREPARING;
    return await order.save();
  }

  async createOrderByAgent(user: User, createOrderDto: AgentCreateOrderDto) {
    const order = new this.orderRepo(createOrderDto);
    order.createby = user._id;
    order.order_status = OrderStatus.PENDING;
    return await order.save();
  }

  async findAll() {
    return await this.orderRepo.find().populate('items.item').exec();
  }

  async findOne(id: string) {
    return this.orderRepo.findById(id);
  }

  async remove(id: string) {
    return await this.orderRepo.findByIdAndDelete(id);
  }
}
