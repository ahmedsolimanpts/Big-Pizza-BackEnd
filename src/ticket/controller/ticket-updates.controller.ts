import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketUpdatesService } from '../service/ticket-updates.service';
import { CreateTicketUpdateDto } from '../dto/Create-Ticket-updates.dto';
import { TicketUpdatesInterface } from '../interface/Ticket-Updates.inteface';
import { UpdateTicketUpdatesDto } from '../dto/update-ticket-updates.dto';
import { Role } from 'src/auth/decorator/roles.decorator';
import { Roles } from 'src/auth/enums/roles.enums';

@ApiTags('Ticket Updates')
@Controller('ticket-updates')
export class TicketUpdatesController {
  constructor(private ticketUpdatesService: TicketUpdatesService) {}

  @Post(':ticket_id')
  async create(
    @Param('ticket_id') ticket_id: string,
    @Body() createTicketDto: CreateTicketUpdateDto,
    @Req() req: Request,
  ) {
    const data: TicketUpdatesInterface = {
      ...createTicketDto,
      ticket: ticket_id,
      createby: (req as any).user._id,
    };
    return this.ticketUpdatesService.create(data);
  }

  @Get()
  findAll() {
    return this.ticketUpdatesService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.ticketUpdatesService.findOneById(id);
  }

  @Get('ticket/:id')
  findByTicketId(@Param('id') id: string) {
    return this.ticketUpdatesService.findByTicketId(id);
  }

  @Role(Roles.SUPERUSER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketUpdatesDto,
  ) {
    return this.ticketUpdatesService.updateOneTicketUpdateById(
      id,
      updateTicketDto,
    );
  }

  @Role(Roles.SUPERUSER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketUpdatesService.removeOneTicketUpdateById(id);
  }
}
