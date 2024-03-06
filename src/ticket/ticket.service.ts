import { Injectable } from '@nestjs/common';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './Models/ticket.model';
import { Model } from 'mongoose';
import { TicketInterface } from './interface/Ticket.interface';
import { AddTicketUpdatesInterface } from './interface/AddTicket-Updates.inteface';
import { TicketStatus } from './enums/ticket-status.enum';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketRepo: Model<Ticket>,
  ) {}

  async create(data: TicketInterface) {
    try {
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

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    try {
      return await this.ticketRepo.findByIdAndUpdate(id, updateTicketDto);
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
  async remove(id: string) {
    try {
      return await this.ticketRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
