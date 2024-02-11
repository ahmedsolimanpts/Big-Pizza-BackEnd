import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from 'src/auth/enums/roles.enums';

export class AssignRoleDto {
  @ApiProperty({
    example: '0121asd014',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userid: string;

  @ApiProperty({
    example: Roles,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
