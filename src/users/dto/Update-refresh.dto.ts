import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRefreshDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
