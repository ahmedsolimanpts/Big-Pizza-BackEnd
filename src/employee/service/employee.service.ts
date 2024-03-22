import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from '../Model/employee.model';
import { ClientSession, Model } from 'mongoose';
import { Roles } from 'src/auth/enums/roles.enums';
import { UsersService } from 'src/users/service/users.service';
import { BranchService } from 'src/branch/branch.service';
import { EmployeeInterface } from '../interfaces/employee.interface';
import { TicketsPool } from 'src/ticket/enums/Ticket-Pool.enum';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeRepo: Model<Employee>,
    private userService: UsersService,
    private branchService: BranchService,
  ) {}

  async create(createEmployeeData: EmployeeInterface): Promise<Employee> {
    try {
      if (createEmployeeData.user) {
        const user = await this.userService.findOneByid(
          createEmployeeData.user,
        );
        if (!user) throw new NotFoundException('User Not Exist');
      }

      const branch = await this.branchService.findOneBranchByID(
        createEmployeeData.working_in,
      );
      if (!branch) throw new NotFoundException('Branch Not Exist');

      const Newemployee = new this.employeeRepo(createEmployeeData);
      return await Newemployee.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string): Promise<Employee> {
    try {
      return await this.employeeRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async findEmpByUserId(id: string): Promise<Employee> {
    try {
      return await this.employeeRepo.findOne({ user: id });
    } catch (err) {
      throw err;
    }
  }

  async IsUserEmployee(userid: string): Promise<boolean> {
    try {
      const user = await this.employeeRepo.findOne({ user: userid });
      if (user) return true;
      return false;
    } catch (err) {
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

  async updateOneByID(id: string, UpdatedData: EmployeeInterface) {
    try {
      if (UpdatedData.user) {
        const user = await this.userService.findOneByid(UpdatedData.user);
        if (!user) throw new NotFoundException('User Not Exist');
      }

      if (UpdatedData.working_in) {
        const branch = await this.branchService.findOneBranchByID(
          UpdatedData.working_in,
        );
        if (!branch) throw new NotFoundException('Branch Not Exist');
      }

      return await this.employeeRepo.findByIdAndUpdate(id, UpdatedData);
    } catch (err) {
      throw err;
    }
  }

  async ChangeTicketPoolByEmployeeID(
    employee_id: string,
    ticket_pool: TicketsPool,
  ) {
    try {
      return await this.employeeRepo.findByIdAndUpdate(employee_id, {
        ticket_pool: ticket_pool,
      });
    } catch (err) {
      throw err;
    }
  }

  async ChangeTicketPoolByUserID(user_id: string, ticket_pool: TicketsPool) {
    try {
      return await this.employeeRepo.findOne(
        { user: user_id },
        {
          ticket_pool: ticket_pool,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  async removeOneByID(id: string) {
    try {
      return await this.employeeRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
