import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillingService } from '../service/billing.service';
import { CreateBillingDto } from '../dto/create-billing.dto';
import { UpdateBillingDto } from '../dto/update-billing.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto);
  }

  @Get()
  findAll() {
    return this.billingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingDto: UpdateBillingDto) {
    return this.billingService.update(+id, updateBillingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingService.remove(+id);
  }
}
