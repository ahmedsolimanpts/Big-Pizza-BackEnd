import { Injectable } from '@nestjs/common';
import { StockGard } from '../Model/Stock-Gard.model';
import { StockGardInterface } from '../interfaces/Stock-Gard.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from '../Model/stock.model';

@Injectable()
export class StockGardService {
  constructor(
    @InjectModel(StockGard.name)
    private readonly stockGardRepo: Model<StockGard>,
    @InjectModel(Stock.name)
    private readonly stockRepo: Model<Stock>,
  ) {}

  async create(data: StockGardInterface) {
    try {
      const { stock_id, ...newData } = data;

      const newGard = new this.stockGardRepo(newData);

      return await this.stockRepo.findByIdAndUpdate(
        stock_id,
        { $push: { gard: newGard } },
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async findAllForOneStock(stock_id: string) {
    try {
      return await this.stockRepo.find({ _id: stock_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneStockGardById(id: string, stock_id: string) {
    try {
      return await this.stockRepo.findOne({
        _id: stock_id,
        'gard._id': id,
      });
    } catch (err) {
      throw err;
    }
  }

  async UpdateStockGardById(id: string, data: StockGardInterface) {
    try {
      return await this.stockRepo
        .updateOne(
          { _id: data.stock_id, 'gard._id': id },
          { $set: { 'gard.$[elem]': data } },
          { arrayFilters: [{ 'elem._id': id }] },
        )
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteStockGardById(id: string, stock_id: string) {
    try {
      return await this.stockRepo.updateOne(
        { _id: stock_id },
        { $pull: { gard: { _id: id } } },
      );
    } catch (err) {
      throw err;
    }
  }
}
