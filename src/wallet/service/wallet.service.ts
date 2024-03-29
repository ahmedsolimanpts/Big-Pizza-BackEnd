import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from '../Model/wallet.model';
import mongoose, { Model } from 'mongoose';
import { CreateWalletInterface } from '../interface/wallet/Create-Wallet.interface';
import { UpdateWalletInterface } from '../interface/wallet/Update-Wallet.interface';
import { UsersService } from 'src/users/service/users.service';
import { WalletTransactionOperation } from '../enum/Wallet-Transaction-Operation.enum';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly walletRepo: Model<Wallet>,
    private readonly userService: UsersService,
  ) {}

  async create(data: CreateWalletInterface): Promise<Wallet> {
    try {
      const user = await this.userService.findOneByid(data.user);
      if (!user) throw new NotFoundException('User Not Exist');
      const newTransaction = new this.walletRepo(data);
      return await newTransaction.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Wallet[]> {
    try {
      return await this.walletRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllUserWallets(user_id: string): Promise<Wallet[]> {
    try {
      return await this.walletRepo.find({ user: user_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneOneByID(id: string): Promise<Wallet> {
    try {
      return await this.walletRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneWalletAmountByWalletID(
    id: string,
    amount: number,
    operation: WalletTransactionOperation,
    session?: mongoose.ClientSession,
  ): Promise<Wallet> {
    try {
      const wallet = await this.walletRepo.findById(id).session(session).exec();
      if (!wallet) throw new NotFoundException('Wrong Wallet ID');

      if (operation == WalletTransactionOperation.ADD) {
        wallet.amount += amount;
      }
      wallet.amount -= amount;
      return await wallet.save({ session });
    } catch (err) {
      throw err;
    }
  }

  async updateOneByID(
    id: string,
    newData: UpdateWalletInterface,
  ): Promise<Wallet> {
    try {
      if (newData.user) {
        const user = await this.userService.findOneByid(newData.user);
        if (!user) throw new NotFoundException('User Not Exist');
      }

      return await this.walletRepo.findByIdAndUpdate(id, newData, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  }

  async removeOneByID(id: string): Promise<Wallet> {
    try {
      return await this.walletRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
