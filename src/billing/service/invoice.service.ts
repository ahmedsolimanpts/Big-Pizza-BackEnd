import { Injectable } from '@nestjs/common';
import { Invoice } from '../Model/Invoice.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(@InjectModel(Invoice.name) private invoiceRepo: Model<Invoice>) {}
  async findOneById(id: string): Promise<Invoice> {
    try {
      return await this.invoiceRepo.findById(id);
    } catch (err) {
      throw err;
    }
  }
}
