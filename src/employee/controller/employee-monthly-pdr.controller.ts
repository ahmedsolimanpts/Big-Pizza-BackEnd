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
import { PdrService } from '../service/monthly-pdr.service';
import { EmployeeMonthlyPDRInterface } from '../interfaces/employee-monthly-pdr.interface';
import { CreateEmployeeMonthlyPdrDTO } from '../dto/Monthly PDR/create-employee-monthly-pdr.dto';
import { UpdateEmployeeMonthlyPDRDTO } from '../dto/Monthly PDR/update-employee-monthly-pdr.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employee Monthly PDR')
@Controller('pdr')
export class PdrController {
  constructor(private readonly empPDRService: PdrService) {}
  @Post('')
  create(@Body() createDto: CreateEmployeeMonthlyPdrDTO, @Req() req: Request) {
    const data: EmployeeMonthlyPDRInterface = {
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

  @Patch(':pdr_id')
  update(
    @Param('pdr_id') pdr_id: string,
    updateDTO: UpdateEmployeeMonthlyPDRDTO,
  ) {
    return this.empPDRService.updateOneByID(pdr_id, updateDTO);
  }

  @Delete(':pdr_id')
  remove(@Param('pdr_id') pdr_id: string) {
    return this.empPDRService.remove(pdr_id);
  }
}
