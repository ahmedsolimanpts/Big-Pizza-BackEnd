import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../Model/payment.model';
import { UpdatePayPalPaymentInterface } from '../interface/Paypal/Update-PayPal-Payment.interface';
import { OrderService } from 'src/order/service/order.service';
import { UsersService } from 'src/users/users.service';
import { CreateBasePaymentInterface } from '../interface/Create-Base-Payment.interface';

@Injectable()
export class PaypalService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentRepo: Model<Payment>,
    private ordeSerivce: OrderService,
    private usersService: UsersService,
  ) {}

  async createPayPalPayment(data: CreateBasePaymentInterface) {
    try {
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

  async updatePayPalPayment(id: string, data: UpdatePayPalPaymentInterface) {
    try {
      return await this.paymentRepo.findByIdAndUpdate(id, data);
    } catch (err) {
      throw err;
    }
  }
}
