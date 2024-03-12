import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StockItemslogs } from '../Model/Stock-item-logs.model';
import { Model } from 'mongoose';
import { StockItemLogsInterface } from '../interfaces/Stock-Item-logs.interface';
import { Stock } from '../Model/stock.model';

@Injectable()
export class StockItemLogsService {
  constructor(
    @InjectModel(StockItemslogs.name)
    private readonly stockItemLogRepo: Model<StockItemslogs>,
    @InjectModel(Stock.name)
    private readonly stockRepo: Model<Stock>,
  ) {}

  async create(data: StockItemLogsInterface) {
    try {
      const { stock_id, ...newData } = data;

      const newItem = new this.stockItemLogRepo(newData);

      return await this.stockRepo.findByIdAndUpdate(
        stock_id,
        { $push: { items: newItem } },
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async findAllForOneBranch(branch_id: string) {
    try {
      return await this.stockRepo.find({ branch: branch_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneStockTransactionById(item_log_id: string, stock_id: string) {
    try {
      return await this.stockRepo.findOne({
        _id: stock_id,
        'items._id': item_log_id,
      });
    } catch (err) {
      throw err;
    }
  }

  async UpdateStockItemLogById(id: string, data: StockItemLogsInterface) {
    try {
      return await this.stockRepo
        .updateOne(
          { _id: data.stock_id, 'items._id': id },
          { $set: { 'items.$[elem]': data } },
          { arrayFilters: [{ 'elem._id': id }] },
        )
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteStockItemLogById(log_id: string, stock_id: string) {
    try {
      return await this.stockRepo.findByIdAndUpdate(stock_id, {
        $pull: { items: { _id: log_id } },
      });
    } catch (err) {
      throw err;
    }
  }
}
