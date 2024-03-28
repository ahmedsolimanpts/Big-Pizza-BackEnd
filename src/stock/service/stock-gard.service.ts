import { Injectable, NotFoundException } from '@nestjs/common';
import { StockGard } from '../Model/Stock-Gard.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockItemService } from './stock-item.service';
import { StockService } from './stock.service';
import { UsersService } from 'src/users/service/users.service';
import { CreateStockGardInterface } from '../interfaces/Stock Gard/Create-Stock-Gard.interface';
import { UpdateStockGardInterface } from '../interfaces/Stock Gard/Update-Stock-Gard.interface';

@Injectable()
export class StockGardService {
  constructor(
    @InjectModel(StockGard.name)
    private readonly stockGardRepo: Model<StockGard>,
    private stockService: StockService,
    private stockItemService: StockItemService,
    private userService: UsersService,
  ) {}

  async create(data: CreateStockGardInterface): Promise<StockGard> {
    try {
      const is_stock = await this.stockService.findOneByID(data.stock);
      if (!is_stock) throw new NotFoundException('Stock Not Exist');

      const is_user = await this.userService.findOneByid(data.createby);
      if (!is_user) throw new NotFoundException('User Not Exist');

      if (data.items) {
        for (const item of data.items) {
          const itemObject = await this.stockItemService.findOneById(
            item.stock_item,
          );
          if (!itemObject) throw new NotFoundException('item Not Exist ');
        }
      }
      const newGard = new this.stockGardRepo(data);

      return await newGard.save();
    } catch (err) {
      throw err;
    }
  }

  async findAllForOneStock(stock_id: string): Promise<StockGard[]> {
    try {
      return await this.stockGardRepo.find({ stock: stock_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneStockGardById(id: string) {
    try {
      return await this.stockGardRepo.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async UpdateStockGardById(id: string, data: UpdateStockGardInterface) {
    try {
      if (data.stock) {
        const is_stock = await this.stockService.findOneByID(data.stock);
        if (!is_stock) throw new NotFoundException('Stock Not Exist');
      }

      if (data.createby) {
        const is_user = await this.userService.findOneByid(data.createby);
        if (!is_user) throw new NotFoundException('User Not Exist');
      }

      if (data.items) {
        for (const item of data.items) {
          const itemObject = await this.stockItemService.findOneById(
            item.stock_item,
          );
          if (!itemObject) throw new NotFoundException('item Not Exist ');
        }
      }
      return await this.stockGardRepo.findByIdAndUpdate(id, data).exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteStockGardById(id: string) {
    try {
      return await this.stockGardRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
