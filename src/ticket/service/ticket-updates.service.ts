import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TicketUpdates } from '../Models/ticket-updates.model';
import { Model } from 'mongoose';
import { TicketUpdatesInterface } from '../interface/Ticket-Updates.inteface';
import { UsersService } from 'src/users/service/users.service';
import { TicketService } from './ticket.service';

@Injectable()
export class TicketUpdatesService {
  constructor(
    @InjectModel(TicketUpdates.name)
    private ticketUpdatesRepo: Model<TicketUpdates>,
    private userService: UsersService,
    private ticketService: TicketService,
  ) {}

  async create(data: TicketUpdatesInterface): Promise<TicketUpdates> {
    try {
      const ticket = await this.ticketService.findOneById(data.ticket);
      if (!ticket) throw new NotFoundException('Wrong Ticket ID');

      const user = await this.userService.findOneByid(data.createby);
      if (!user) throw new NotFoundException('Wrong User ID');

      const newTicketUpdate = new this.ticketUpdatesRepo(data);
      return await newTicketUpdate.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<TicketUpdates[]> {
    try {
      return await this.ticketUpdatesRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string): Promise<TicketUpdates> {
    try {
      return await this.ticketUpdatesRepo.findById(id).exec();
    } catch (err) {
      throw err;
    }
  }

  async findByTicketId(ticket_id: string): Promise<TicketUpdates[]> {
    try {
      return await this.ticketUpdatesRepo.find({ ticket: ticket_id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneTicketUpdateById(
    id: string,
    TicketUpdate: TicketUpdatesInterface,
  ): Promise<TicketUpdates> {
    try {
      if (TicketUpdate.ticket) {
        const ticket = await this.ticketService.findOneById(
          TicketUpdate.ticket,
        );
        if (!ticket) throw new NotFoundException('Wrong Ticket ID');
      }

      if (TicketUpdate.createby) {
        const user = await this.userService.findOneByid(TicketUpdate.createby);
        if (!user) throw new NotFoundException('Wrong User ID');
      }

      return await this.ticketUpdatesRepo.findByIdAndUpdate(id, TicketUpdate);
    } catch (err) {
      throw err;
    }
  }

  async removeOneTicketUpdateById(id: string) {
    try {
      return await this.ticketUpdatesRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
