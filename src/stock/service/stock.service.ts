import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from '../Model/stock.model';
import { Model } from 'mongoose';
import { BranchService } from 'src/branch/branch.service';
import { CreateStockInterface } from '../interfaces/Stock/Create-Stock.interface';
import { UpdateStockInterface } from '../interfaces/Stock/Update-Stock.interface';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name) private readonly stockRepo: Model<Stock>,
    private banchService: BranchService,
  ) {}

  async createStock(createStockData: CreateStockInterface): Promise<Stock> {
    try {
      const branch = await this.banchService.findOneBranchByID(
        createStockData.branch,
      );
      if (!branch) throw new NotFoundException('Branch Not Exist');
      const newStock = new this.stockRepo(createStockData);
      return await newStock.save();
    } catch (err) {
      if (err.code == 11000) {
        throw new ConflictException('Stock Already Exist');
      }
      throw err;
    }
  }

  async findAll(): Promise<Stock[]> {
    try {
      return await this.stockRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByID(id: string): Promise<Stock> {
    try {
      return await this.stockRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOnebyID(
    stock_id: string,
    updatedStockData: UpdateStockInterface,
  ): Promise<Stock> {
    try {
      if (updatedStockData.branch) {
        const branch = await this.banchService.findOneBranchByID(
          updatedStockData.branch,
        );
        if (!branch) throw new NotFoundException('Branch Not Exist');
      }
      return await this.stockRepo.findByIdAndUpdate(stock_id, updatedStockData);
    } catch (err) {
      throw err;
    }
  }

  async removeOnebyID(id: string): Promise<Stock> {
    try {
      return await this.stockRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
