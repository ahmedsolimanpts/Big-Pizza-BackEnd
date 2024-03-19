import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../Model/employee.model';
import { Attendence } from '../Model/attendence.model';
import { AttendenceInterface } from '../interfaces/emp-attendence.interface';

@Injectable()
export class AttendenceService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeRepo: Model<Employee>,
    @InjectModel(Attendence.name)
    private readonly attendenceRepo: Model<Attendence>,
  ) {}

  async create(NewData: AttendenceInterface) {
    try {
      const emp = await this.employeeRepo.findById(NewData.employee);
      if (!emp) throw new NotFoundException('Employee Not Exist');
      const new_Record = new this.attendenceRepo({
        NewData,
      });

      return await new_Record.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Attendence[]> {
    try {
      return await this.attendenceRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findByID(attend_id: string): Promise<Attendence> {
    try {
      return await this.attendenceRepo.findById(attend_id).exec();
    } catch (err) {
      throw err;
    }
  }

  async findByEmployeeID(employee_id: string): Promise<Attendence[]> {
    try {
      return await this.attendenceRepo.find({ employee: employee_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async updateEmployeeAttend(
    attendenceId: string,
    updatedData: AttendenceInterface,
  ): Promise<Employee> {
    try {
      if (updatedData.employee) {
        const emp = await this.employeeRepo.findById(updatedData.employee);
        if (!emp) throw new NotFoundException('Employee Not Exist');
      }
      return await this.attendenceRepo.findByIdAndUpdate(
        attendenceId,
        updatedData,
      );
    } catch (err) {
      throw err;
    }
  }

  async removeEmployeeAttend(attendenceId: string): Promise<Employee> {
    try {
      return await this.attendenceRepo.findByIdAndDelete(attendenceId);
    } catch (err) {
      throw err;
    }
  }
}
