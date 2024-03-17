import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TicketInterface } from './interface/Ticket.interface';
import { AddTicketUpdateDto } from './dto/Add-Ticket-updates.dtos';
import { AddTicketUpdatesInterface } from './interface/AddTicket-Updates.inteface';
import { Role } from 'src/auth/decorator/roles.decorator';
import { Roles } from 'src/auth/enums/roles.enums';
import { TicketStatus } from './enums/ticket-status.enum';

@ApiTags('Tickets')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post(':branchid')
  async create(
    @Param('branchid') branchid: string,
    @Body() createTicketDto: CreateTicketDto,
    @Req() req: Request,
  ) {
    const data: TicketInterface = {
      ...createTicketDto,
      createby: (req as any).user._id,
      branch: branchid,
    };
    return this.ticketService.create(data);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.ticketService.findOneById(id);
  }

  @Post('updates/:ticketid')
  AddTicketUpdates(
    @Param('ticketid') ticketid: string,
    @Body() updateTicketDto: AddTicketUpdateDto,
    @Req() req: Request,
  ) {
    const data: AddTicketUpdatesInterface = {
      ...updateTicketDto,
      createby: (req as any).user._id,
    };
    return this.ticketService.AddTicketupdate(ticketid, data);
  }

  @Role(Roles.SUPERUSER)
  @Patch('status/:ticketid/:newstatus')
  updateTicketStatus(
    @Param('ticketid') ticketid: string,
    @Param('newstatus') newstatus: TicketStatus,
  ) {
    try {
      return this.ticketService.ChangeTicketStatus(ticketid, newstatus);
    } catch (err) {
      throw err;
    }
  }

  @Role(Roles.SUPERUSER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.updateOneTicketById(id, updateTicketDto);
  }

  @Role(Roles.SUPERUSER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.removeOneTicketById(id);
  }
}
