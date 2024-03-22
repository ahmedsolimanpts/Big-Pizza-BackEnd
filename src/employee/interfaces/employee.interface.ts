import { Sex } from 'src/users/enums/Sex.enum';
import { Department } from '../enums/department.enums';
import { TicketsPool } from 'src/ticket/enums/Ticket-Pool.enum';

export interface EmployeeInterface {
  join_at?: Date;

  user?: string;

  working_in?: string;

  department?: Department;

  base_salary?: number;

  phones?: string[];

  gender?: Sex;

  addrees?: Location;

  ssid?: string;

  birthdate?: Date;

  bank_account?: string;

  ticket_pool?: TicketsPool;
}
