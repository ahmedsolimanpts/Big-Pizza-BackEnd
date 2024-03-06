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
      const { branch_id, ...newData } = data;

      const newItem = new this.stockItemLogRepo(newData);

      return await this.stockRepo.findOneAndUpdate(
        { branch: branch_id },
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

  async findOneBranchTransactionById(id: string, branch_id: string) {
    try {
      return await this.stockRepo.findOne({
        branch: branch_id,
        'items._id': id,
      });
    } catch (err) {
      throw err;
    }
  }

  async UpdateById(id: string, data: StockItemLogsInterface) {
    try {
      return await this.stockRepo
        .updateOne(
          { branch: data.branch_id, 'items._id': id },
          { $set: { 'items.$[elem]': data } },
          { arrayFilters: [{ 'elem._id': id }] },
        )
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteById(id: string, branch_id: string) {
    try {
      return await this.stockRepo.updateOne(
        { branch: branch_id },
        { $pull: { items: { _id: id } } },
      );
    } catch (err) {
      throw err;
    }
  }
}
