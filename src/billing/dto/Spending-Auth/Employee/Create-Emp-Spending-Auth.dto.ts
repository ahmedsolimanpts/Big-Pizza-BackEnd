import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { CreateSpendingAuthDto } from '../create-Spending-Auth.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeSpendingAuthDto extends CreateSpendingAuthDto {
  @ApiProperty({
    example: '507f191e810c19729de860ea',
    description:
      'MongoDB ObjectId of the employee related to the spending authorization',
    required: true,
  })
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  employee: string;
}
