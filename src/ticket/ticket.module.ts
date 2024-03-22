import { Module } from '@nestjs/common';
import { TicketService } from './service/ticket.service';
import { TicketController } from './controller/ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './Models/ticket.model';
import {
  TicketUpdates,
  TicketUpdatesSchema,
} from './Models/ticket-updates.model';
import { BranchModule } from 'src/branch/branch.module';
import { UsersModule } from 'src/users/users.module';
import { TicketUpdatesService } from './service/ticket-updates.service';
import { TicketUpdatesController } from './controller/ticket-updates.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
      {
        name: TicketUpdates.name,
        schema: TicketUpdatesSchema,
      },
    ]),
    BranchModule,
    UsersModule,
  ],
  controllers: [TicketController, TicketUpdatesController],
  providers: [TicketService, TicketUpdatesService],
})
export class TicketModule {}
