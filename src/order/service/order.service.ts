import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Order } from '../Model/order.model';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { OrderStatus } from '../enums/Order-Status.enums';
import { OrderInterface } from '../Interface/Order.interface';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderRepo: Model<Order>,
    private productService: ProductService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(data: OrderInterface) {
    const session = await this.connection.startSession();
    try {
      await session.withTransaction(async () => {
        const items = data['items'];
        // Check Availability
        for (const item of items) {
          const isAvailable =
            await this.productService.IsProductAvailableInBranchWithQuantity(
              item.item,
              data['branch'],
              item.quantity,
            );
          if (!isAvailable) {
            throw new NotFoundException(
              "item Doesn't exist with this quantity",
            );
          }
        }
        // Subtract from quantity
        for (const item of items) {
          await this.productService.SubtractproductQuantity(
            item.item,
            item.quantity,
          );
        }
        const newOrder = new this.orderRepo(data); // Removed session from here
        await newOrder.save();
      });
    } catch (err) {
      // Error handling logic here, if any specific actions needed
      throw err; // Rethrow the error to be handled elsewhere or logged
    } finally {
      await session.endSession(); // Ensure session is ended properly
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

  async removeOneOrderByID(id: string) {
    try {
      return await this.orderRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
