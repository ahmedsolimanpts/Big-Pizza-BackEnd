import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/service/users.service';
import { EmployeePDRActionInterface } from '../interfaces/emp-pdr-actions.interface';
import { EmployeeMonthlyPDRInterface } from '../interfaces/employee-monthly-pdr.interface';
import { EmployeePDRAction } from '../Model/emp-pdr-actions.model';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmpPdrActionService {
  constructor(
    @InjectModel(EmployeePDRAction.name)
    private readonly employeePDRActionRepo: Model<EmployeePDRAction>,
    private employeeService: EmployeeService,
    private userService: UsersService,
  ) {}

  async create(data: EmployeePDRActionInterface): Promise<EmployeePDRAction> {
    try {
      const emp = await this.employeeService.findOneById(data.employee);
      if (!emp) throw new NotFoundException('Employee not found');

      const NewPDRAction = new this.employeePDRActionRepo(data);
      return await NewPDRAction.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<EmployeePDRAction[]> {
    try {
      return await this.employeePDRActionRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string): Promise<EmployeePDRAction> {
    try {
      return await this.employeePDRActionRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async findByEmployeeId(employee_id: string): Promise<EmployeePDRAction[]> {
    try {
      return await this.employeePDRActionRepo
        .find({ employee: employee_id })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneByID(
    id: string,
    UpdatedData: EmployeeMonthlyPDRInterface,
  ): Promise<EmployeePDRAction> {
    try {
      if (UpdatedData.employee) {
        const employee = await this.employeeService.findOneById(
          UpdatedData.employee,
        );
        if (!employee) throw new NotFoundException('Employee Not Exist');
      }

      if (UpdatedData.createby) {
        const user = await this.userService.findOneByid(UpdatedData.createby);
        if (!user) throw new NotFoundException('User Not Exist');
      }

      return await this.employeePDRActionRepo.findByIdAndUpdate(
        id,
        UpdatedData,
      );
    } catch (err) {
      throw err;
    }
  }

  async removeOneById(pdr_id: string): Promise<EmployeePDRAction> {
    try {
      return await this.employeePDRActionRepo.findByIdAndDelete(pdr_id);
    } catch (err) {
      throw err;
    }
  }
}
