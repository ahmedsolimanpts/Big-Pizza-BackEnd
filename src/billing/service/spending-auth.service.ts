import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpendingAuthorization } from '../Model/Spending Authorization/Spending-Authorization.model';
import { EmployeeSpendingAuthInteface } from '../interface/Spending Authriztion/Employee-Spending-Auth.interface';
import { InvoiceSpendingAuthInteface } from '../interface/Spending Authriztion/Invoice-Spending-Auth.interface';
import { EmployeeService } from 'src/employee/service/employee.service';
import { UsersService } from 'src/users/service/users.service';
import { InvoiceService } from './invoice.service';
import { SpendingAuthorizationStatus } from '../enum/SpendingAuthorization-status.enum';

@Injectable()
export class SpendingAuthService {
  constructor(
    @InjectModel(SpendingAuthorization.name)
    private spendingAuthRepo: Model<SpendingAuthorization>,
    private employeeService: EmployeeService,
    private userService: UsersService,
    private invoiceService: InvoiceService,
  ) {}

  async create(
    data: EmployeeSpendingAuthInteface | InvoiceSpendingAuthInteface,
  ): Promise<SpendingAuthorization> {
    try {
      if ('employee' in data) {
        const employee = await this.employeeService.findOneById(data.employee);
        if (!employee) throw new NotFoundException('Wrong Employee ID');
      }

      if ('invoice' in data) {
        const employee = await this.invoiceService.findOneById(data.invoice);
        if (!employee) throw new NotFoundException('Wrong Invoice ID');
      }

      const user = await this.userService.findOneByid(data.createby);
      if (!user) throw new NotFoundException('Wrong User ID');

      const newTicket = new this.spendingAuthRepo(data);
      return await newTicket.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<SpendingAuthorization[]> {
    try {
      return await this.spendingAuthRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findByCreateBy(createby_id: string): Promise<SpendingAuthorization[]> {
    try {
      return await this.spendingAuthRepo.find({ createby: createby_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async findByReleasedBy(
    releasedby_id: string,
  ): Promise<SpendingAuthorization[]> {
    try {
      return await this.spendingAuthRepo
        .find({ releasedby: releasedby_id })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findByStatus(
    status: SpendingAuthorizationStatus,
  ): Promise<SpendingAuthorization[]> {
    try {
      return await this.spendingAuthRepo.find({ status: status }).exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string): Promise<SpendingAuthorization> {
    try {
      return await this.spendingAuthRepo.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async updateOneById(
    id: string,
    data: EmployeeSpendingAuthInteface | InvoiceSpendingAuthInteface,
  ): Promise<SpendingAuthorization> {
    try {
      if ('employee' in data) {
        const employee = await this.employeeService.findOneById(data.employee);
        if (!employee) throw new NotFoundException('Wrong Employee ID');
      }

      if ('invoice' in data) {
        const invoice = await this.invoiceService.findOneById(data.invoice);
        if (!invoice) throw new NotFoundException('Wrong Invoice ID');
      }

      if (data.createby) {
        const user = await this.userService.findOneByid(data.createby);
        if (!user) throw new NotFoundException('Wrong User ID');
      }

      return await this.spendingAuthRepo.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  }

  async removeOneById(id: string) {
    try {
      return await this.spendingAuthRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
