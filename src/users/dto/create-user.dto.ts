import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from 'src/auth/enums/roles.enums';

export class CreateUserDto {
  @ApiProperty({
    example: 'ahmed@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'mypassword',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'ahmed',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEnum(Roles)
  roles: Roles;
}
