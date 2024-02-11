import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyandRefreshTokenDto {
  @ApiProperty({
    example: '0121asdasd21',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  userid: string;

  @ApiProperty({
    example: '01sdad.asdsds505.asda0wqeq05',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
