import { IsNotEmpty, IsString } from 'class-validator';

export class AddTicketUpdateDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
