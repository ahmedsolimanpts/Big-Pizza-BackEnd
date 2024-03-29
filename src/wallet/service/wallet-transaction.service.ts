import { Injectable } from '@nestjs/common';
import { UpdateWalletTransaction } from '../interface/wallet Transaction/Update-Wallet-Transaction.interface';
import { CreateWalletTransaction } from '../interface/wallet Transaction/Create-Wallet-Transaction.interface';
import { InjectModel } from '@nestjs/mongoose';
import { WalletTransaction } from '../Model/Wallet-Transaction.model';
import { Model } from 'mongoose';

@Injectable()
export class WalletTransactionService {
  constructor(
    @InjectModel(WalletTransaction.name)
    private readonly walletTransactionRepo: Model<WalletTransaction>,
  ) {}

  async create(data: CreateWalletTransaction): Promise<WalletTransaction> {
    try {
      const newTransaction = new this.walletTransactionRepo(data);
      return await newTransaction.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<WalletTransaction[]> {
    try {
      return await this.walletTransactionRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByID(id: string): Promise<WalletTransaction> {
    try {
      return await this.walletTransactionRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneByID(
    id: string,
    newData: UpdateWalletTransaction,
  ): Promise<WalletTransaction> {
    try {
      return await this.walletTransactionRepo.findByIdAndUpdate(id, newData, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  }

  async removeOneByID(id: string): Promise<WalletTransaction> {
    try {
      return await this.walletTransactionRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
