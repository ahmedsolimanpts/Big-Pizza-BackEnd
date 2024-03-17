import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';
import { Roles } from 'src/auth/enums/roles.enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsEnum(Roles)
  @ArrayMinSize(1)
  @IsString()
  @IsOptional()
  roles?: Roles[];

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
