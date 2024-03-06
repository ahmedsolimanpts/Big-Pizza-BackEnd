import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Attendence,
  Employee,
  EmployeeTransactions,
} from './Model/employee.model';
import { Model } from 'mongoose';
import { CreateAttendActionDTO } from './dto/create-attend-action.dto';
import { EmployeeTransactionInterface } from './interfaces/emp-transaction.interface';
import { CreateEmployeePDRDTO } from './dto/create-employee-pdr.dto';
import { Transaction } from './enums/emp-transaction.enum';
import * as moment from 'moment'; // Import moment.js for date manipulation
import { AttendenceActions } from './enums/attendence-action.enums';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeRepo: Model<Employee>,
    @InjectModel(EmployeeTransactions.name)
    private readonly employeeTransactionRepo: Model<EmployeeTransactions>,
    @InjectModel(Attendence.name)
    private readonly AttendenceRepo: Model<Attendence>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const Newemployee = new this.employeeRepo(createEmployeeDto);
      return await Newemployee.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeRepo.find().exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findById(id: string): Promise<Employee> {
    try {
      return await this.employeeRepo.findById(id).populate('attendence').exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findEmpByUserId(id: string): Promise<Employee> {
    try {
      return await this.employeeRepo.findOne({ user: id });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async IsUserEmployee(userid: string): Promise<boolean> {
    try {
      const user = await this.employeeRepo.findOne({ user: userid });
      if (user) return true;
      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async IsUserWorkingInBranch(userId, branchid: string): Promise<boolean> {
    try {
      const isExist = await this.employeeRepo.findOne({
        user: userId,
        working_in: branchid,
      });
      if (isExist) return true;
      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return await this.employeeRepo.findByIdAndUpdate(id, updateEmployeeDto);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async remove(id: string) {
    try {
      return await this.employeeRepo.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

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

  async AddEmployeeAttendAction(
    user_id: string,
    createAttendActionDTO: CreateAttendActionDTO,
  ) {
    try {
      const emp = await this.employeeRepo.findById(
        createAttendActionDTO.employee_id,
      );
      const new_Record = new this.AttendenceRepo({
        ...createAttendActionDTO,
        signby: user_id,
      });

      if (emp && emp.attendence) {
        const last_record = emp.attendence[emp.attendence.length - 1];
        if (last_record && last_record.action == new_Record.action) {
          throw new ConflictException("Can't Add This Action");
        }
        await emp.attendence.push(new_Record);
        return await emp.save();
      }
      emp.attendence = [new_Record];
      return await emp.save();
    } catch (err) {
      throw err;
    }
  }

  async removeEmployeeAttendAction(
    employeeId: string,
    attendenceId: string,
  ): Promise<Employee> {
    try {
      return await this.employeeRepo.findByIdAndUpdate(
        employeeId,
        { $pull: { attendence: { _id: attendenceId } } },
        { new: true },
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async AddEmployeePDR(
    user_id: string,
    createby: string,
    data: CreateEmployeePDRDTO,
  ) {
    try {
      data['createbu'] = createby;
      return await this.employeeRepo.findOneAndUpdate(
        { user: user_id },
        { $push: { monthly_pdr: data } },
      );
    } catch (err) {
      throw err;
    }
  }

  async removeEmployeePDR(user_id: string, pdr_id: string): Promise<Employee> {
    try {
      return await this.employeeRepo.findOneAndUpdate(
        { user: user_id },
        { $pull: { monthly_pdr: { _id: pdr_id } } },
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

  async calculateWorkingHoursForMonth(
    month: number,
    year: number,
  ): Promise<any[]> {
    const employees = await this.findAll();
    const workingHours = [];

    for (const employee of employees) {
      let totalHours = 0;
      const attendances = employee.attendence.filter((att) => {
        const attDate = moment((att as any).createdAt);
        return attDate.month() === month && attDate.year() === year;
      });

      let dailyHours = 0;
      let signInTime = null;

      for (const attendance of attendances) {
        const actionTime = moment((attendance as any).createdAt);

        if (attendance.action === AttendenceActions.SIGNIN) {
          signInTime = actionTime;
        } else if (
          attendance.action === AttendenceActions.SIGNOUT &&
          signInTime
        ) {
          dailyHours += actionTime.diff(signInTime, 'hours', true);
          signInTime = null; // Reset signInTime for the next day
        }
      }

      // Add a check for the last action being SignOut
      if (signInTime !== null) {
        // If the last action is not SignOut, don't count the hours for the last day
        dailyHours = 0;
      }

      totalHours += dailyHours;
      workingHours.push({
        employeeId: employee.user,
        totalHours: totalHours.toFixed(2),
      });
    }

    return workingHours;
  }
}
