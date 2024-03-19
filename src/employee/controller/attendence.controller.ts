import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { AttendenceService } from '../service/attendence.service';
import { AttendenceInterface } from '../interfaces/emp-attendence.interface';
import { CreateAttendenceDTO } from '../dto/Attendence/create-attendence.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateAttendenceDTO } from '../dto/Attendence/update-attendence.dto';

@ApiTags('Employee Attendence')
@Controller('employee-attendence')
export class AttendenceController {
  constructor(private attendService: AttendenceService) {}

  @Post()
  create(@Body() createDto: CreateAttendenceDTO, @Req() req: Request) {
    const data: AttendenceInterface = {
      ...createDto,
      signby: (req as any).user._id,
    };
    return this.attendService.create(data);
  }

  @Get()
  findAll() {
    return this.attendService.findAll();
  }

  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.attendService.findByID(id);
  }

  @Get('employee/:id')
  findByEmployeeID(@Param('id') id: string) {
    return this.attendService.findByEmployeeID(id);
  }

  @Patch(':attendanceid')
  update(
    @Param('attendanceid') AttendenceId: string,
    updateAttendenceDTO: UpdateAttendenceDTO,
  ) {
    return this.attendService.updateEmployeeAttend(
      AttendenceId,
      updateAttendenceDTO,
    );
  }

  @Delete(':attendanceid')
  delete(@Param('attendanceid') AttendenceId: string) {
    return this.attendService.removeEmployeeAttend(AttendenceId);
  }
}
