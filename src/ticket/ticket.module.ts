import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './Models/ticket.model';
import {
  TicketUpdates,
  TicketUpdatesSchema,
} from './Models/ticket-updates.model';
import { BranchModule } from 'src/branch/branch.module';
import { UsersModule } from 'src/users/users.module';

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
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
