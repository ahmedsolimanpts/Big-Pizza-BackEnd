import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmployeePDRDTO {
  @IsNotEmpty()
  @IsNumber()
  pdr: number;

  @IsOptional()
  @IsString()
  details?: string;
}
