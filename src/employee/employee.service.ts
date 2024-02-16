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
}
