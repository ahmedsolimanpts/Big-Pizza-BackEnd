import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './Models/ticket.model';
import { Model } from 'mongoose';
import { TicketInterface } from './interface/Ticket.interface';
import { AddTicketUpdatesInterface } from './interface/AddTicket-Updates.inteface';
import { TicketStatus } from './enums/ticket-status.enum';
import { UsersService } from 'src/users/service/users.service';
import { BranchService } from 'src/branch/branch.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketRepo: Model<Ticket>,
    private userService: UsersService,
    private branchService: BranchService,
  ) {}

  async create(data: TicketInterface) {
    try {
      const branch = await this.branchService.findOneBranchByID(data.branch);
      if (!branch) throw new NotFoundException('Wrong Branch ID');

      const user = await this.userService.findOneByid(data.createby);
      if (!user) throw new NotFoundException('Wrong User ID');

      const newTicket = new this.ticketRepo(data);
      return await newTicket.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.ticketRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.ticketRepo.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async updateOneTicketById(id: string, newTicketUpdate: TicketInterface) {
    try {
      if (newTicketUpdate.branch) {
        const branch = await this.branchService.findOneBranchByID(
          newTicketUpdate.branch,
        );
        if (!branch) throw new NotFoundException('Wrong Branch ID');
      }

      if (newTicketUpdate.createby) {
        const user = await this.userService.findOneByid(
          newTicketUpdate.createby,
        );
        if (!user) throw new NotFoundException('Wrong User ID');
      }

      return await this.ticketRepo.findByIdAndUpdate(id, newTicketUpdate);
    } catch (err) {
      throw err;
    }
  }

  async AddTicketupdate(id: string, data: AddTicketUpdatesInterface) {
    try {
      return await this.ticketRepo.findByIdAndUpdate(id, {
        $push: { updates: data },
      });
    } catch (err) {
      throw err;
    }
  }

  async ChangeTicketStatus(id: string, status: TicketStatus) {
    try {
      return await this.ticketRepo.findOneAndUpdate(
        { _id: id, status: { $ne: TicketStatus.CLOSE } },
        { $set: { status } },
      );
    } catch (err) {
      throw err;
    }
  }
  async removeOneTicketById(id: string) {
    try {
      return await this.ticketRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
