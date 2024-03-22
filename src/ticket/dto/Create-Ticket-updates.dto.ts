import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketUpdateDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
