import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from '../Model/payment.model';
import { Model } from 'mongoose';
import { CreateCashPaymentInterface } from '../interface/Cash/Create-Cash-Payment.interface';
import { UpdateCashPaymentInterface } from '../interface/Cash/Update-Cash-Payment.interface';
import { OrderService } from 'src/order/service/order.service';
import { UsersService } from 'src/users/users.service';
import { BranchService } from 'src/branch/branch.service';

@Injectable()
export class CashService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentRepo: Model<Payment>,
    private ordeSerivce: OrderService,
    private usersService: UsersService,
    private branchService: BranchService,
  ) {}
  async createCashPayment(data: CreateCashPaymentInterface) {
    try {
      const branch = await this.branchService.findOneBranchByID(data.branch);
      if (!branch) throw new NotFoundException('Branch Not Exist');
      // Check If Order Exist
      const order = await this.ordeSerivce.findOneOrderByID(data.order_id);
      if (!order) throw new NotFoundException('Order Not Exist');

      // Check If User Exist
      const user = await this.usersService.findOneByid(data.createby);
      if (!user) throw new NotFoundException('User Not Exist');

      const newPayment = new this.paymentRepo(data);
      return await newPayment.save();
    } catch (err) {
      throw err;
    }
  }

  async updateCash(id: string, data: UpdateCashPaymentInterface) {
    try {
      if (data.branch) {
        const branch = await this.branchService.findOneBranchByID(data.branch);
        if (!branch) throw new NotFoundException('Branch Not Exist');
      }

      if (data.order_id) {
        // Check If Order Exist
        const order = await this.ordeSerivce.findOneOrderByID(data.order_id);
        if (!order) throw new NotFoundException('Order Not Exist');
      }

      if (data.createby) {
        // Check If User Exist
        const user = await this.usersService.findOneByid(data.createby);
        if (!user) throw new NotFoundException('User Not Exist');
      }

      return await this.paymentRepo.findByIdAndUpdate(id, data);
    } catch (err) {
      throw err;
    }
  }
}
