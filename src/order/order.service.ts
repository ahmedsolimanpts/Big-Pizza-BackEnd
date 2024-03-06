import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import {
  DelivereyOrderType,
  DineinOrder,
  Order,
  TakeAwayOrder,
} from './Model/order.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBaseOrderDto } from './dto/base-order.dto';
import { BranchService } from 'src/branch/branch.service';
import { EmployeeService } from 'src/employee/employee.service';
import { OrderStatus } from './enums/Order-Status.enums';
import { CreateOrderInterface } from './Interface/Create-Order.interface';
import { TakeAwayOrderInterface } from './Interface/TakeAway-Order.interfce';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderRepo: Model<Order>,
    @InjectModel(TakeAwayOrder.name)
    private readonly TakeAwayRepo: Model<TakeAwayOrder>,
    @InjectModel(DineinOrder.name)
    private readonly DineInRepo: Model<DineinOrder>,
    @InjectModel(DelivereyOrderType.name)
    private readonly DelivereyRepo: Model<DelivereyOrderType>,
    private branchService: BranchService,
    private employeeService: EmployeeService,
  ) {}

  async CreateBaseOrder(CreateOrderData: CreateBaseOrderDto) {
    try {
      const newOrder = new this.orderRepo(CreateOrderData);
      return await newOrder.save();
    } catch (err) {
      throw err;
    }
  }

  async CreateOrder(CreateOrderData: CreateOrderInterface) {
    // try {
    //   const emp = await this.employeeService.findEmpByUserId(
    //     CreateOrderData.createby,
    //   );
    //   //  Check If this is Employee
    //   if (emp) {
    //     // Employee But Check His Working Location
    //     if (
    //       new mongoose.Types.ObjectId(emp.working_in) ==
    //       new mongoose.Types.ObjectId(CreateOrderData.branch)
    //     ) {
    //       CreateOrderData.approvedby = CreateOrderData.createby;
    //       if (CreateOrderData.order_type == OrderType.TAKEAWAY) {
    //         return this.CreateTakeAwayOrder(CreateOrderData);
    //       }
    //     }
    //     // Employee But Working in Another Location
    //     else {
    //       CreateOrderData.order_status = OrderStatus.PENDING;
    //       if (CreateOrderData.order_type == OrderType.TAKEAWAY) {
    //         return this.CreateTakeAwayOrder(CreateOrderData);
    //       }
    //     }
    //     // User But Not An Employee
    //   } else {
    //     CreateOrderData.order_status = OrderStatus.PENDING;
    //     if (CreateOrderData.order_type == OrderType.TAKEAWAY) {
    //       return this.CreateTakeAwayOrder(CreateOrderData);
    //     }
    //   }
    // } catch (err) {
    //   throw err;
    // }
  }

  async CreateTakeAwayOrder(CreateOrderData: TakeAwayOrderInterface) {
    try {
      const emp = await this.employeeService.findEmpByUserId(
        CreateOrderData.createby,
      );
      //  Check If this is Employee
      if (emp) {
        // Employee But Check His Working Location
        if (
          new mongoose.Types.ObjectId(emp.working_in) ==
          new mongoose.Types.ObjectId(CreateOrderData.branch)
        ) {
          CreateOrderData.approvedby = CreateOrderData.createby;
          const order = new this.TakeAwayRepo(CreateOrderData);
          return await order.save();
        }
      }
      CreateOrderData.order_status = OrderStatus.PENDING;
      const order = new this.TakeAwayRepo(CreateOrderData);
      return await order.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.orderRepo.find().populate('items.item').exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByID(id: string) {
    try {
      return this.orderRepo.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async findAllPendingOrder() {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.PENDING })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllPendingOrderByBranchID(branchid: string) {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.PENDING, branch: branchid })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllPendingOrderByUserID(userid: string) {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.PENDING, createby: userid })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async UpdateOrderStatusByOrderID(orderid: string, newStatus: OrderStatus) {
    try {
      return await this.orderRepo.findByIdAndUpdate(orderid, {
        $set: { order_status: newStatus },
      });
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      return await this.orderRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
