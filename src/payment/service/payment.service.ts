import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from '../Model/payment.model';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentRepo: Model<Payment>,
  ) {}

  async findAll() {
    try {
      return await this.paymentRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.paymentRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      return await this.paymentRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
