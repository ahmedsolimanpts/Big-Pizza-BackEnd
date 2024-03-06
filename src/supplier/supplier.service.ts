import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from './Model/supplier.Model';
import { Model } from 'mongoose';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private readonly supplierRepo: Model<Supplier>,
  ) {}
  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const newSupplier = new this.supplierRepo(createSupplierDto);
      return await newSupplier.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.supplierRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.supplierRepo.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    try {
      return await this.supplierRepo.findByIdAndUpdate(id, updateSupplierDto);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      return await this.supplierRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
