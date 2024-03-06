import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockItemInterface } from '../interfaces/Stock-Item.interface';
import { StockItem } from '../Model/Stock-Item.model';

@Injectable()
export class StockItemService {
  constructor(
    @InjectModel(StockItem.name)
    private readonly stockItemRepo: Model<StockItem>,
  ) {}

  async create(data: StockItemInterface) {
    try {
      const newItem = new this.stockItemRepo(data);
      return await newItem.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.stockItemRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.stockItemRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async UpdateById(id: string, data: StockItemInterface) {
    try {
      return await this.stockItemRepo
        .findByIdAndUpdate(id, { data }, { new: true })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteById(id: string) {
    try {
      return await this.stockItemRepo.findByIdAndDelete(id).exec();
    } catch (err) {
      throw err;
    }
  }
}
