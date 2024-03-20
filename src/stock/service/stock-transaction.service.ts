import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StockTransactionStatus } from '../enums/Stock-Transaction-Status.enum';
import { StockTransactionInterface } from '../interfaces/Stock-Transaction.interface';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { StockTransaction } from '../Model/Stock-Transaction.model';
import { StockItemLogsInterface } from '../interfaces/Stock-Item-logs.interface';
import { StockTransactionTYPE } from '../enums/Stock-Transactions.enum';
import { StockItemLogsService } from './stock-item-logs.service';
import { UsersService } from 'src/users/service/users.service';
import { StockService } from './stock.service';
import { StockItemService } from './stock-item.service';

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectModel(StockTransaction.name)
    private readonly stockTransactionRepo: Model<StockTransaction>,
    private stockItemlogSerivce: StockItemLogsService,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private userService: UsersService,
    private stockService: StockService,
    private stockItemService: StockItemService,
  ) {}

  async Create(data: StockTransactionInterface): Promise<StockTransaction> {
    try {
      // Check If User Valid
      const createby = await this.userService.findOneByid(data.createby);
      if (!createby) throw new NotFoundException('User Not Exist');

      // Check If Stock Valid
      const stock = await this.stockService.findOneByID(data.stock);
      if (!stock) throw new NotFoundException('Stock Not found');

      // Check If Stock Valid
      for (const item of data.items_quantity) {
        const is_item_available = await this.stockItemService.findOneById(
          item.stock_item,
        );
        if (!is_item_available) throw new NotFoundException('Item not found');
      }
      const newTransactin = new this.stockTransactionRepo(data);
      return await newTransactin.save();
    } catch (err) {
      if (err.code) {
        console.log(err.message);
        throw new ConflictException();
      }
      throw err;
    }
  }

  async ChangeTransactionStatus(
    transaction_id,
    status: StockTransactionStatus,
    updateby: string,
  ): Promise<StockTransaction | object> {
    try {
      // Check is Transaction ID Valid
      const transactionObject =
        await this.findOneStockTransactionByID(transaction_id);
      if (!transactionObject)
        throw new NotFoundException('Not Valid Transaction');

      //  Check If Status Not The Same
      if (transactionObject.status === status) {
        throw new ConflictException('You Need To Call Your SuperVisor');
      } else {
        if (transactionObject.status == StockTransactionStatus.INPROGRESS) {
          //  If Status Completed add to Stock then Update the status
          if (status == StockTransactionStatus.COMPELETED) {
            const session = await this.connection.startSession();

            await session.withTransaction(async () => {
              this.AddTransactionToStock(transactionObject, updateby);
              await this.UpdateOneByID(transaction_id, { status });
            });

            session.endSession();

            return { MSG: 'Transaction added successfully' };
          } else {
            // Status Is Canceled only Update
            return await this.UpdateOneByID(transaction_id, {
              status,
              updated_user: updateby,
            });
          }
        } else {
          throw new ConflictException(
            "You Need To Call Your SuperVisor, Can't Change Status After Accept Or Cancel",
          );
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async AddTransactionToStock(
    transaction: StockTransactionInterface,
    createby: string,
  ): Promise<void> {
    try {
      const session = await this.connection.startSession();
      await session.withTransaction(async () => {
        (await transaction).items_quantity.forEach(async (item) => {
          const newLogData: StockItemLogsInterface = {
            item: { stock_item: item.stock_item, quantity: item.quantity },
            createby,
            transaction: StockTransactionTYPE.ADD,
            transaction_id: (transaction as any)._id,
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

  async findOneStockTransactionByID(
    stock_id: string,
  ): Promise<StockTransaction> {
    try {
      return await this.stockTransactionRepo.findById(stock_id);
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<StockTransaction[]> {
    try {
      return await this.stockTransactionRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllTransactionForSpecificBranch(
    branch_id: string,
  ): Promise<StockTransaction[]> {
    try {
      return await this.stockTransactionRepo.find({ branch: branch_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async UpdateOneByID(
    transaction_id: string,
    data: StockTransactionInterface,
  ): Promise<StockTransaction> {
    try {
      if (data.stock) {
        // Check If Stock Valid
        const stock = await this.stockService.findOneByID(data.stock);
        if (!stock) throw new NotFoundException('Stock Not found');
      }

      if (data.createby) {
        // Check If user Valid
        const user = await this.userService.findOneByid(data.createby);
        if (!user) throw new NotFoundException('User Not found');
      }

      if (data.updated_user) {
        // Check If user Valid
        const user = await this.userService.findOneByid(data.updated_user);
        if (!user) throw new NotFoundException('User Not found');
      }

      if (data.status) {
        const enumValues = Object.values(StockTransactionStatus);
        if (!enumValues.includes(data.status))
          throw new NotFoundException('Status Not Exist');
      }
      return await this.stockTransactionRepo.findByIdAndUpdate(
        transaction_id,
        data,
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async DeleteOneByID(transaction_id: string): Promise<StockTransaction> {
    try {
      return await this.stockTransactionRepo
        .findByIdAndDelete(transaction_id)
        .exec();
    } catch (err) {
      throw err;
    }
  }
}
