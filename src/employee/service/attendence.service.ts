import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, Attendence } from '../Model/employee.model';
import { CreateAttendActionDTO } from '../dto/create-attend-action.dto';

@Injectable()
export class AttendenceService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeRepo: Model<Employee>,
    @InjectModel(Attendence.name)
    private readonly AttendenceRepo: Model<Attendence>,
  ) {}

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
