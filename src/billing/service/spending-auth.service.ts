import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { SpendingAuthorization } from '../Model/Spending Authorization/Spending-Authorization.model';
import { EmployeeService } from 'src/employee/service/employee.service';
import { UsersService } from 'src/users/service/users.service';
import { InvoiceService } from './invoice.service';
import { SpendingAuthorizationStatus } from '../enum/SpendingAuthorization-status.enum';
import { CashierService } from 'src/cashier/cashier.service';
import { CreateInvoiceSpendingAuthInteface } from '../interface/Spending Authriztion/create/create-Invoice-Spending-Auth.interface';
import { CreateEmployeeSpendingAuthInteface } from '../interface/Spending Authriztion/create/Create-Employee-Spending-Auth.interface';
import { UpdateEmployeeSpendingAuthInteface } from '../interface/Spending Authriztion/update/Update-Employee-Spending-Auth.interface';
import { UpdateInvoiceSpendingAuthInteface } from '../interface/Spending Authriztion/update/Update-Invoice-Spending-Auth.interface';
import { CreateCashierShiftInterface } from 'src/cashier/interface/Create-Cashier-Shift.interface';
import { CashierTransaction } from 'src/cashier/enum/cashier-transaction.enum';

@Injectable()
export class SpendingAuthService {
  constructor(
    @InjectModel(SpendingAuthorization.name)
    private spendingAuthRepo: Model<SpendingAuthorization>,
    private employeeService: EmployeeService,
    private userService: UsersService,
    private invoiceService: InvoiceService,
    private cashierService: CashierService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(
    data:
      | CreateInvoiceSpendingAuthInteface
      | CreateEmployeeSpendingAuthInteface,
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

  async ReleaseSpendingAuthById(
    id: string,
    release_by: string,
  ): Promise<SpendingAuthorization> {
    try {
      const session = await this.connection.startSession();
      let spendingAuthRow;

      await session.withTransaction(async () => {
        const user = await this.userService.findOneByid(release_by);
        if (!user) throw new NotFoundException('User Not Exist');

        spendingAuthRow = await this.spendingAuthRepo
          .findByIdAndUpdate(id, {
            releasedby: release_by,
            status: SpendingAuthorizationStatus.CLOSE,
          })
          .exec();

        if (spendingAuthRow) {
          const CashierShift: CreateCashierShiftInterface = {
            amount: spendingAuthRow.amount,
            create_by: release_by,
            transaction: CashierTransaction.SUBTRACT,
          };

          await this.cashierService.create(CashierShift);
        }
      });

      session.endSession();

      return spendingAuthRow;
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
    data:
      | UpdateEmployeeSpendingAuthInteface
      | UpdateInvoiceSpendingAuthInteface,
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
