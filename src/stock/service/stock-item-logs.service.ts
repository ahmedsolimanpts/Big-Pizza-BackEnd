import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StockItemslogs } from '../Model/Stock-item-logs.model';
import { Model } from 'mongoose';
import { StockItemLogsInterface } from '../interfaces/Stock-Item-logs.interface';
import { Stock } from '../Model/stock.model';
import { StockTransactionTYPE } from '../enums/Stock-Transactions.enum';
import { StockItemService } from './stock-item.service';

@Injectable()
export class StockItemLogsService {
  constructor(
    @InjectModel(StockItemslogs.name)
    private readonly stockItemLogRepo: Model<StockItemslogs>,
    @InjectModel(Stock.name)
    private readonly stockRepo: Model<Stock>,
    private readonly stockItemService: StockItemService,
  ) {}

  async create(data: StockItemLogsInterface): Promise<Stock> {
    try {
      const { stock_id, ...newData } = data;

      const stock = await this.stockRepo.findById(stock_id);
      if (!stock) throw new NotFoundException('Wrong Stock');

      const item = await this.stockItemService.findOneById(
        newData.item[0].stock_item,
      );
      if (!item) throw new NotFoundException('Item Not Found');

      if (newData.transaction == StockTransactionTYPE.ADD) {
        throw new ConflictException("Can't Add To Stock Back To Your Manager");
      }
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

  async findOneStockTransactionById(
    item_log_id: string,
    stock_id: string,
  ): Promise<Stock> {
    try {
      return await this.stockRepo.findOne({
        _id: stock_id,
        'items._id': item_log_id,
      });
    } catch (err) {
      throw err;
    }
  }

  async DeleteStockItemLogById(
    log_id: string,
    stock_id: string,
  ): Promise<Stock> {
    try {
      return await this.stockRepo.findByIdAndUpdate(stock_id, {
        $pull: { items: { _id: log_id } },
      });
    } catch (err) {
      throw err;
    }
  }
}
