import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { WalletService } from './service/wallet.service';
import { CreateWalletDto } from './dto/wallet/create-wallet.dto';
import { UpdateWalletDto } from './dto/wallet/update-wallet.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateWalletInterface } from './interface/wallet/Create-Wallet.interface';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto, @Req() req: Request) {
    const newWallet: CreateWalletInterface = {
      ...createWalletDto,
      user: (req as any).user._id,
    };
    return this.walletService.create(newWallet);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOneOneByID(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.updateOneByID(id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.removeOneByID(id);
  }
}
