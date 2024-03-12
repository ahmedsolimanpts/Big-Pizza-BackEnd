import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { PdrService } from '../service/pdr.service';
import { CreateEmployeePDRDTO } from '../dto/create-employee-pdr.dto';

@Controller('pdr')
export class PdrController {
  constructor(private readonly empPDRService: PdrService) {}
  @Post(':userid')
  addEmpPDR(
    @Param('userid') user_id: string,
    @Body() createDto: CreateEmployeePDRDTO,
    @Req() req: Request,
  ) {
    return this.empPDRService.AddEmployeePDR(
      user_id,
      (req as any).user._id,
      createDto,
    );
  }

  @Delete(':userid/:pdr_id')
  removeEmpPDR(
    @Param('userid') user_id: string,
    @Param('pdr_id') pdr_id: string,
  ) {
    return this.empPDRService.removeEmployeePDR(user_id, pdr_id);
  }
}
