import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CashierShift } from './Model/Cashier-shift.model';
import { Model } from 'mongoose';
import { CreateCashierShiftInterface } from './interface/Create-Cashier-Shift.interface';
import { UpdateCashierShiftInterface } from './interface/Update-Cashier-Shift.interface';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class CashierService {
  constructor(
    @InjectModel(CashierShift.name)
    private cahierShiftRepo: Model<CashierShift>,
    private userServices: UsersService,
  ) {}

  async create(data: CreateCashierShiftInterface): Promise<CashierShift> {
    try {
      const newRow = new this.cahierShiftRepo(data);
      return await newRow.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<CashierShift[]> {
    try {
      return await this.cahierShiftRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string): Promise<CashierShift> {
    try {
      return await this.cahierShiftRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneByUser(user_id: string): Promise<CashierShift[]> {
    try {
      return await this.cahierShiftRepo.find({ create_by: user_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, newData: UpdateCashierShiftInterface) {
    try {
      if (newData.create_by) {
        const user = await this.userServices.findOneByid(newData.create_by);
        if (!user) throw new NotFoundException('User Not Exist');
      }
      return await this.cahierShiftRepo.findByIdAndUpdate(id, newData);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      return await this.cahierShiftRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
