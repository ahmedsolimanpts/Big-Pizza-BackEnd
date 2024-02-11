import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Roles } from 'src/auth/enums/roles.enums';

export class CreateAdminUserDto {
  @ApiProperty({
    example: 'ayani@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'ayani',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'mypassword',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  roles: Roles = Roles.ADMIN;
}
