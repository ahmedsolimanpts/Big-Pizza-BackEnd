import { ConflictException, Injectable } from '@nestjs/common';
import { StockTransactionStatus } from '../enums/Stock-Transaction-Status.enum';
import { StockTransactionInterface } from '../interfaces/Stock-Transaction.interface';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { StockTransaction } from '../Model/Stock-Transaction.model';
import { StockItemService } from './stock-item.service';
import { StockItemLogsInterface } from '../interfaces/Stock-Item-logs.interface';
import { StockTransactionTYPE } from '../enums/Stock-Transactions.enum';
import { StockItemLogsService } from './stock-item-logs.service';

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectModel(StockTransaction.name)
    private readonly stockTransactionRepo: Model<StockTransaction>,
    private stockItemSerivce: StockItemService,
    private stockItemlogSerivce: StockItemLogsService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async Create(data: StockTransactionInterface) {
    try {
      const newTransactin = new this.stockTransactionRepo(data);
      return await newTransactin.save();
    } catch (err) {
      throw err;
    }
  }

  async ChangeTransactionStatus(
    transaction_id,
    status: StockTransactionStatus,
    createby: string,
  ) {
    try {
      const data = await this.findOneByID(transaction_id);
      if (data.status === status) {
        throw new ConflictException('Status Already ', status);
      } else {
        if (
          status == StockTransactionStatus.COMPELETED &&
          data.status == StockTransactionStatus.INPROGRESS
        ) {
          const session = await this.connection.startSession();

          await session.withTransaction(async () => {
            this.AddTransactionToStock(transaction_id, createby);
            await this.UpdateOneByID(transaction_id, { status });
          });

          session.endSession();

          return { MSG: 'Transaction added successfully' };
        } else {
          return await this.UpdateOneByID(transaction_id, { status });
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async AddTransactionToStock(
    transaction: StockTransactionInterface,
    createby: string,
  ) {
    try {
      const session = await this.connection.startSession();
      await session.withTransaction(async () => {
        (await transaction).stock_items.forEach(async (item) => {
          const newLogData: StockItemLogsInterface = {
            item: { stock_item: item.stock_item, quantity: item.quantity },
            createby,
            transaction: StockTransactionTYPE.ADD,
            stock_id: transaction.stock,
          };
          await this.stockItemlogSerivce.create(newLogData);
        });
        session.endSession();
      });
    } catch (err) {
      throw err;
    }
  }

  async findOneByID(id: string) {
    try {
      return await this.stockTransactionRepo.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.stockTransactionRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllTransactionForSpecificBranch(branch_id: string) {
    try {
      return await this.stockTransactionRepo.find({ branch: branch_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async UpdateOneByID(transaction_id: string, data: StockTransactionInterface) {
    try {
      return await this.stockTransactionRepo
        .findByIdAndUpdate(transaction_id, { data }, { new: true })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async DeleteOneByID(transaction_id: string) {
    try {
      return await this.stockTransactionRepo
        .findByIdAndDelete(transaction_id)
        .exec();
    } catch (err) {
      throw err;
    }
  }
}
