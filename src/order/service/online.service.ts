import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../Model/order.model';

@Injectable()
export class OnlineService {
  constructor(
    @InjectModel(Order.name) private readonly orderRepo: Model<Order>,
  ) {}
}
