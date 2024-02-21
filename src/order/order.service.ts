import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Order } from './Model/order.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBaseOrderDto } from './dto/base-order.dto';
import { CreateDeliveryDto } from 'src/delivery/dto/create-delivery.dto';
import { CreateDineInOrderDto } from './dto/dinein/create-dinein-order.dto';
import { CreateTakeAwayOrderDto } from './dto/takeaway/create-takeaway-order.dto';
import { BranchService } from 'src/branch/branch.service';
import { EmployeeService } from 'src/employee/employee.service';
import { OrderStatus } from './enums/Order-Status.enums';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderRepo: Model<Order>,
    private branchService: BranchService,
    private employeeService: EmployeeService,
  ) {}

  async CreateBaseOrder(createOrderDTO: CreateBaseOrderDto) {
    try {
      const newOrder = new this.orderRepo(createOrderDTO);
      return await newOrder.save();
    } catch (err) {
      throw err;
    }
  }

  async CreateOrder(
    createOrderDTO:
      | CreateDeliveryDto
      | CreateDineInOrderDto
      | CreateTakeAwayOrderDto,
  ) {
    try {
      const branch = await this.branchService.findOneByID(
        (createOrderDTO as CreateBaseOrderDto).branch,
      );
      // Check If the Branch Exist
      if (branch) {
        const emp = await this.employeeService.findEmpByUserId(
          (createOrderDTO as CreateBaseOrderDto).createby,
        );
        //  Check If this is Employee
        if (emp) {
          // Employee But Check His Working Location
          if (new mongoose.Types.ObjectId(emp.working_in) == branch._id) {
            (createOrderDTO as CreateBaseOrderDto).approvedby = (
              createOrderDTO as CreateBaseOrderDto
            ).createby;
            const newOrder = new this.orderRepo(createOrderDTO);
            return await newOrder.save();
          }
          // Employee But Working in Another Location
          else {
            (createOrderDTO as CreateBaseOrderDto).order_status =
              OrderStatus.PENDING;
            const newOrder = new this.orderRepo(createOrderDTO);
            return await newOrder.save();
          }
          // User But Not An Employee
        } else {
          (createOrderDTO as CreateBaseOrderDto).order_status =
            OrderStatus.PENDING;
          const newOrder = new this.orderRepo(createOrderDTO);
          return await newOrder.save();
        }
      }
      throw new NotFoundException('Branch NOT Found');
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
