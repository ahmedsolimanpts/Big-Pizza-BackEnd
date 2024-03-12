import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../Model/employee.model';
import { CreateEmployeePDRDTO } from '../dto/create-employee-pdr.dto';

@Injectable()
export class PdrService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeRepo: Model<Employee>,
  ) {}

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
}
