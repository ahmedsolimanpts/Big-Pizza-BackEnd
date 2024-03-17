import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Attendence, Employee } from '../Model/employee.model';
import { ClientSession, Model } from 'mongoose';

import * as moment from 'moment'; // Import moment.js for date manipulation
import { AttendenceActions } from '../enums/attendence-action.enums';
import { Roles } from 'src/auth/enums/roles.enums';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeRepo: Model<Employee>,
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

  async IsUserWorkingInBranchAndHaveRole(
    userid: string,
    branchid: string,
    role: Roles,
    session?: ClientSession,
  ): Promise<boolean> {
    try {
      const employee = await this.employeeRepo
        .findOne({ user: userid, working_in: branchid })
        .populate('user')
        .session(session);

      // Check if the employee exists and if the populated user has the specified role
      if (
        employee &&
        employee.user &&
        (employee as any).user.roles.includes(role)
      ) {
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async IsUserWorkingInBranch(
    userId,
    branchid: string,
    session?: ClientSession,
  ): Promise<boolean> {
    try {
      const isExist = await this.employeeRepo
        .findOne({
          user: userId,
          working_in: branchid,
        })
        .session(session)
        .exec();
      if (!isExist) return false;
      return true;
    } catch (err) {
      throw err;
    }
  }

  async updateOneByID(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return await this.employeeRepo.findByIdAndUpdate(id, updateEmployeeDto);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async removeOneByID(id: string) {
    try {
      return await this.employeeRepo.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw err;
    }
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
