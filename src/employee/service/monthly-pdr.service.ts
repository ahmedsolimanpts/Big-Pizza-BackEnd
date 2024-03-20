import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../Model/employee.model';
import { EmployeeMonthlyPDR } from '../Model/emp-monthly-pdr.model';
import { EmployeeService } from './employee.service';
import { EmployeeMonthlyPDRInterface } from '../interfaces/employee-monthly-pdr.interface';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class PdrService {
  constructor(
    @InjectModel(EmployeeMonthlyPDR.name)
    private readonly employeeMothlyPDRRepo: Model<EmployeeMonthlyPDR>,
    private employeeService: EmployeeService,
    private userService: UsersService,
  ) {}

  async create(data: EmployeeMonthlyPDRInterface): Promise<EmployeeMonthlyPDR> {
    try {
      const emp = await this.employeeService.findOneById(data.employee);
      if (!emp) throw new NotFoundException('Employee not found');

      const NewmonthlyPDR = new this.employeeMothlyPDRRepo(data);
      return await NewmonthlyPDR.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<EmployeeMonthlyPDR[]> {
    try {
      return await this.employeeMothlyPDRRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string): Promise<EmployeeMonthlyPDR> {
    try {
      return await this.employeeMothlyPDRRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async findByEmployeeId(employee_id: string): Promise<EmployeeMonthlyPDR[]> {
    try {
      return await this.employeeMothlyPDRRepo
        .find({ employee: employee_id })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneByID(
    id: string,
    UpdatedData: EmployeeMonthlyPDRInterface,
  ): Promise<EmployeeMonthlyPDR> {
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

      return await this.employeeMothlyPDRRepo.findByIdAndUpdate(
        id,
        UpdatedData,
      );
    } catch (err) {
      throw err;
    }
  }

  async remove(pdr_id: string): Promise<Employee> {
    try {
      return await this.employeeMothlyPDRRepo.findByIdAndDelete(pdr_id);
    } catch (err) {
      throw err;
    }
  }
}
