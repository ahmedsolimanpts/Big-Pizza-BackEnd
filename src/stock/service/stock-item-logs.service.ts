import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StockItemslogs } from '../Model/Stock-item-logs.model';
import { Model } from 'mongoose';
import { StockTransactionTYPE } from '../enums/Stock-Transactions.enum';
import { StockItemService } from './stock-item.service';
import { StockService } from './stock.service';
import { UsersService } from 'src/users/service/users.service';
import { StockTransactionService } from './stock-transaction.service';
import { CreateStockItemLogsInterface } from '../interfaces/Stock Item Logs/Create-Stock-Item-logs.interface';
import { UpdateStockItemLogsInterface } from '../interfaces/Stock Item Logs/Update-Stock-Item-logs.interface';

@Injectable()
export class StockItemLogsService {
  constructor(
    @InjectModel(StockItemslogs.name)
    private readonly stockItemLogRepo: Model<StockItemslogs>,
    private readonly stockService: StockService,
    private readonly stockItemService: StockItemService,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => StockTransactionService))
    private readonly stockTransactionService: StockTransactionService,
  ) {}

  async create(data: CreateStockItemLogsInterface): Promise<StockItemslogs> {
    try {
      const stock = await this.stockService.findOneByID(data.stock);
      if (!stock) throw new NotFoundException('Wrong Stock');

      const item = await this.stockItemService.findOneById(
        data.item[0].stock_item,
      );
      if (!item) throw new NotFoundException('Item Not Found');

      if (data.transaction == StockTransactionTYPE.ADD) {
        throw new ConflictException("Can't Add To Stock Back To Your Manager");
      }
      const newStockItemLog = new this.stockItemLogRepo(data);

      return await newStockItemLog.save();
    } catch (err) {
      throw err;
    }
  }

  async findOneStockItemLogById(item_log_id: string): Promise<StockItemslogs> {
    try {
      return await this.stockItemLogRepo.findById(item_log_id).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneStockItemLogByStock(
    stock_id: string,
  ): Promise<StockItemslogs[]> {
    try {
      return await this.stockItemLogRepo.find({ stock: stock_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async UpdateStockItemLogById(id: string, data: UpdateStockItemLogsInterface) {
    try {
      if (data.stock) {
        const is_exist = await this.stockService.findOneByID(data.stock);
        if (!is_exist) throw new NotFoundException('Stock Not Exist');
      }

      if (data.createby) {
        const is_exist = await this.userService.findOneByid(data.createby);
        if (!is_exist) throw new NotFoundException('User Not Exist');
      }

      if (data.item) {
        const is_exist = await this.stockItemService.findOneById(
          data.item.stock_item,
        );
        if (!is_exist) throw new NotFoundException('item Not Exist ');
      }

      if (data.transaction_id) {
        const is_exist =
          await this.stockTransactionService.findOneStockTransactionByID(
            data.transaction_id,
          );
        if (!is_exist) throw new NotFoundException('item Not Exist ');
      }

      return await this.stockItemLogRepo.findByIdAndUpdate(id, data).exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteStockItemLogById(log_id: string): Promise<StockItemslogs> {
    try {
      return await this.stockItemLogRepo.findByIdAndDelete(log_id);
    } catch (err) {
      throw err;
    }
  }
}
