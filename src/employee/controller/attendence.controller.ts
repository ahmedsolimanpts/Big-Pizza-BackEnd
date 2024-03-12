import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { AttendenceService } from '../service/attendence.service';
import { CreateAttendActionDTO } from '../dto/create-attend-action.dto';

@Controller('employee-attendence')
export class AttendenceController {
  constructor(private attendService: AttendenceService) {}

  @Post()
  addAttend(@Body() createDto: CreateAttendActionDTO, @Req() req: Request) {
    return this.attendService.AddEmployeeAttendAction(
      (req as any).user._id,
      createDto,
    );
  }

  @Delete(':employeeid/:attendanceid')
  removeAttend(
    @Param('employeeid') employeeid: string,
    @Param('attendanceid') AttendenceId: string,
  ) {
    return this.attendService.removeEmployeeAttendAction(
      employeeid,
      AttendenceId,
    );
  }
}
