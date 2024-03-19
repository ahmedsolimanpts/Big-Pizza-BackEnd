import { PDRActions } from '../enums/pdr-action.enum';

export interface EmployeePDRActionInterface {
  employee?: string;

  grade?: number;

  action?: PDRActions;

  note?: string;

  createby?: string;

  date?: Date;
}
