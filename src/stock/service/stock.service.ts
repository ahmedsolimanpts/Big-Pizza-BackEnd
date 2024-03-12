import { Injectable } from '@nestjs/common';
import { CreateStockDto } from '../dto/Stock/create-stock.dto';
import { UpdateStockDto } from '../dto/Stock/update-stock.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Stock } from '../Model/stock.model';
import mongoose, { Model } from 'mongoose';
import { StockItemLogsInterface } from '../interfaces/Stock-Item-logs.interface';
import { StockItemslogs } from '../Model/Stock-item-logs.model';
import { StockTransactionTYPE } from '../enums/Stock-Transactions.enum';
import { StockItem } from '../Model/Stock-Item.model';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name) private readonly stockRepo: Model<Stock>,
    @InjectModel(StockItemslogs.name)
    private readonly stockItemLogRepo: Model<StockItemslogs>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async createStock(createStockDto: CreateStockDto) {
    try {
      const newStock = new this.stockRepo(createStockDto);
      return await newStock.save();
    } catch (err) {
      throw err;
    }
  }

  async CreateStockItemlog(data: StockItemLogsInterface) {
    try {
      const { stock_id, ...stocklogdata } = data;
      const newStckItemLog = new this.stockItemLogRepo(stocklogdata);
      return await this.stockRepo.findByIdAndUpdate(stock_id, {
        $push: { items: newStckItemLog },
      });
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.stockRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByID(id: string) {
    try {
      return await this.stockRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async GetItemsCountAtStock(stockid: string) {
    try {
      const stock = await this.stockRepo.findById(stockid).populate({
        path: 'items',
        populate: {
          path: 'item',
          populate: {
            path: 'stock_item',
            model: StockItem.name, // Make sure this matches the name you've given your stock item model
          },
        },
      });

      if (!stock) {
        throw new Error('Stock not found');
      }

      const itemCounts = {};
      stock.items.forEach((log) => {
        const itemName = (log as any).item.stock_item.name;
        const quantity = log.item.quantity;
        const transactionType = log.transaction;

        if (!itemCounts[itemName]) {
          itemCounts[itemName] = 0;
        }

        // If transaction type is 'add', increase the count, otherwise decrease it
        if (transactionType === StockTransactionTYPE.ADD) {
          itemCounts[itemName] += quantity;
        } else {
          itemCounts[itemName] -= quantity;
        }
      });

      return itemCounts;
    } catch (err) {
      throw err;
    }
  }

  async updateOnebyID(id: string, updateStockDto: UpdateStockDto) {
    try {
      return await this.stockRepo.findByIdAndUpdate(id, updateStockDto);
    } catch (err) {
      throw err;
    }
  }

  async removeOnebyID(id: string) {
    try {
      return await this.stockRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
