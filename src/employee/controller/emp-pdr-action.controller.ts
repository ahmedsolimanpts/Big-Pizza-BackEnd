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
import { EmpPdrActionService } from '../service/employee-pdr-action.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmployeePdrActionDto } from '../dto/Employee  PDR Actions/create-emp-pdr-action.dto';
import { EmployeePDRActionInterface } from '../interfaces/emp-pdr-actions.interface';
import { UpdateEmployeePdrActionDto } from '../dto/Employee  PDR Actions/update-emp-pdr-action.dto';

@ApiTags('Employee Pdr Action')
@Controller('emp-pdr-action')
export class EmpPdrActionController {
  constructor(private readonly empPDRService: EmpPdrActionService) {}

  @Post()
  create(@Body() createDto: CreateEmployeePdrActionDto, @Req() req: Request) {
    const data: EmployeePDRActionInterface = {
      ...createDto,
      createby: (req as any).user._id,
    };
    return this.empPDRService.create(data);
  }

  @Get()
  findAll() {
    return this.empPDRService.findAll();
  }

  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.empPDRService.findOneById(id);
  }

  @Get('employee/:id')
  findByEmployeeID(@Param('id') id: string) {
    return this.empPDRService.findByEmployeeId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, updateDTO: UpdateEmployeePdrActionDto) {
    return this.empPDRService.updateOneByID(id, updateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empPDRService.removeOneById(id);
  }
}
