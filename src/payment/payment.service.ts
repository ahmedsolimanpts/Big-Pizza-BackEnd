import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './Model/payment.model';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentRepo: Model<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const newPayment = new this.paymentRepo(createPaymentDto);
      return await newPayment.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.paymentRepo.find().exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.paymentRepo.findById(id).exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      return await this.paymentRepo.findByIdAndUpdate(id, updatePaymentDto);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async remove(id: string) {
    try {
      return await this.paymentRepo.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
