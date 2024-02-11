import { Branch } from 'src/branch/Model/branch.model';
import { Department } from '../enums/departments.enums';

export interface Employee {
  worksin: Branch;
  department: Department;
  startDate: Date;
  salary: number;
  notes: string;
  birthdate: Date;
  ssn: string;
}
