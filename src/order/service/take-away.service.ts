import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { EmployeeService } from 'src/employee/service/employee.service';
import { Order } from '../Model/order.model';
import { OrderStatus } from '../enums/Order-Status.enums';

@Injectable()
export class TakeAwayService {
  constructor(
    private employeeService: EmployeeService,
    @InjectModel(Order.name) private readonly orderRepo: Model<Order>,
  ) {}
  async CreateTakeAwayOrder(CreateOrderData) {
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
          const order = new this.orderRepo(CreateOrderData);
          return await order.save();
        }
      }
      CreateOrderData.order_status = OrderStatus.PENDING;
      const order = new this.orderRepo(CreateOrderData);
      return await order.save();
    } catch (err) {
      throw err;
    }
  }
}
