import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInByEmailDto {
  @ApiProperty({
    example: 'ayani@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'mypassword',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
