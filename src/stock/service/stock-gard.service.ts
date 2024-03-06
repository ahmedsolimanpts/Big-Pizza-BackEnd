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
      const { branch_id, ...newData } = data;

      const newGard = new this.stockGardRepo(newData);

      return await this.stockRepo.findOneAndUpdate(
        { branch: branch_id },
        { $push: { gard: newGard } },
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

  async findOneBranchGardById(id: string, branch_id: string) {
    try {
      return await this.stockRepo.findOne({
        branch: branch_id,
        'gard._id': id,
      });
    } catch (err) {
      throw err;
    }
  }

  async UpdateById(id: string, data: StockGardInterface) {
    try {
      return await this.stockRepo
        .updateOne(
          { branch: data.branch_id, 'gard._id': id },
          { $set: { 'gard.$[elem]': data } },
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
        { $pull: { gard: { _id: id } } },
      );
    } catch (err) {
      throw err;
    }
  }
}
