import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeTransactions } from '../Model/employee.model';
import { Transaction } from '../enums/emp-transaction.enum';
import { EmployeeTransactionInterface } from '../interfaces/emp-transaction.interface';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeRepo: Model<Employee>,
  ) {}
  async addEmployeeTransaction(data: EmployeeTransactionInterface) {
    try {
      const updatedEmployee = await this.employeeRepo.findByIdAndUpdate(
        data.employee_id,
        {
          $push: { transaction: data },
        },
        { new: true },
      );
      if (!updatedEmployee) {
        throw new NotFoundException('Employee not found');
      }

      return updatedEmployee;
    } catch (err) {
      throw err;
    }
  }

  async removeEmployeeTransaction(
    employeeId: string,
    transactionId: string,
  ): Promise<Employee> {
    try {
      return await this.employeeRepo.findByIdAndUpdate(
        employeeId,
        { $pull: { transaction: { _id: transactionId } } },
        { new: true },
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async calculateTotalSalaryForMonth(month: string): Promise<any[]> {
    const employees = await this.employeeRepo
      .find()
      .populate('transaction')
      .exec();
    const results = [];

    for (const employee of employees) {
      let totalSalary = employee.base_salary;

      // Filter transactions for the specified month and adjust totalSalary
      employee.transaction.forEach((transaction: EmployeeTransactions) => {
        const transactionMonth = (transaction as any).createdAt.getMonth() + 1; // Months are 0-indexed
        const transactionYear = (transaction as any).createdAt.getFullYear();
        const [year, monthNumber] = month.split('-').map(Number); // Assuming month is in "YYYY-MM" format

        if (transactionYear === year && transactionMonth === monthNumber) {
          if (transaction.transaction === Transaction.BONAS) {
            totalSalary += transaction.amount;
          } else if (transaction.transaction === Transaction.LOAN) {
            totalSalary -= transaction.amount;
          }
        }
      });

      results.push({ employeeId: employee._id, totalSalary });
    }

    return results;
  }

  async calculateTotalSalaryForMonthForUser(
    month: string,
    user_id: string,
  ): Promise<any> {
    const employee = await this.employeeRepo
      .findOne({ user: user_id })
      .populate('transaction')
      .exec();
    let totalSalary = employee.base_salary;

    // Filter transactions for the specified month and adjust totalSalary
    employee.transaction.forEach((transaction: EmployeeTransactions) => {
      const transactionMonth = (transaction as any).createdAt.getMonth() + 1; // Months are 0-indexed
      const transactionYear = (transaction as any).createdAt.getFullYear();
      const [year, monthNumber] = month.split('-').map(Number); // Assuming month is in "YYYY-MM" format

      if (transactionYear === year && transactionMonth === monthNumber) {
        if (transaction.transaction === Transaction.BONAS) {
          totalSalary += transaction.amount;
        } else if (transaction.transaction === Transaction.LOAN) {
          totalSalary -= transaction.amount;
        }
      }
    });

    return totalSalary;
  }
}
