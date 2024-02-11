import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    example: 'ID',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  userid: string;
}
