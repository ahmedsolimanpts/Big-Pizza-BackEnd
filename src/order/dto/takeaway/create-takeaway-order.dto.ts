import { Branch } from 'src/branch/Model/branch.model';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CreateBaseOrderDto } from '../base-order.dto';

export class CreateTakeAwayOrderDto extends CreateBaseOrderDto {}
