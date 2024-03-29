import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketUpdateDto {
  @ApiProperty({
    description: 'The description new Ticket Update',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
