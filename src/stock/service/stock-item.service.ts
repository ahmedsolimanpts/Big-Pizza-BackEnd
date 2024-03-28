import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockItem } from '../Model/Stock-Item.model';
import { CreateStockItemInterface } from '../interfaces/Stock Item/Create-Stock-Item.interface';
import { UpdateStockItemInterface } from '../interfaces/Stock Item/Update-Stock-Item.interface';

@Injectable()
export class StockItemService {
  constructor(
    @InjectModel(StockItem.name)
    private readonly stockItemRepo: Model<StockItem>,
  ) {}

  async create(data: CreateStockItemInterface): Promise<StockItem> {
    try {
      const newItem = new this.stockItemRepo(data);
      return await newItem.save();
    } catch (err) {
      if (err.code == 11000) {
        throw new ConflictException('Item Is Already Exist');
      }
      throw err;
    }
  }

  async findAll(): Promise<StockItem[]> {
    try {
      return await this.stockItemRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async AreStockItemsExist(stockItems: string[]): Promise<boolean> {
    try {
      const items = await this.stockItemRepo.find({ _id: stockItems }).exec();
      if (items.length == stockItems.length) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  async findOneById(item_id: string): Promise<StockItem> {
    try {
      return await this.stockItemRepo.findById(item_id).exec();
    } catch (err) {
      throw err;
    }
  }

  async UpdateById(
    item_id: string,
    data: UpdateStockItemInterface,
  ): Promise<StockItem> {
    try {
      return await this.stockItemRepo
        .findByIdAndUpdate(item_id, { data }, { new: true })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteById(item_id: string): Promise<StockItem> {
    try {
      return await this.stockItemRepo.findByIdAndDelete(item_id).exec();
    } catch (err) {
      throw err;
    }
  }
}
