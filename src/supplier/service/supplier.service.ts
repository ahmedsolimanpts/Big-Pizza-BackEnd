import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from '../Model/supplier.Model';
import { Model } from 'mongoose';
import { CreateSupplierInterface } from '../interface/Supplier/Create-supplier.interface';
import { UpdateSupplierInterface } from '../interface/Supplier/supplier.interface';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private readonly supplierRepo: Model<Supplier>,
  ) {}

  async create(createSupplierData: CreateSupplierInterface): Promise<Supplier> {
    try {
      const newSupplier = new this.supplierRepo(createSupplierData);
      return await newSupplier.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Supplier[]> {
    try {
      return await this.supplierRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(supplier_id: string): Promise<Supplier> {
    try {
      return await this.supplierRepo.findById(supplier_id);
    } catch (err) {
      throw err;
    }
  }

  async updateOneSupplierByID(
    supplier_id: string,
    updatedSupplierData: UpdateSupplierInterface,
  ): Promise<Supplier> {
    try {
      return await this.supplierRepo.findByIdAndUpdate(
        supplier_id,
        updatedSupplierData,
      );
    } catch (err) {
      throw err;
    }
  }

  async removeOneSupplierByID(supplier_id: string): Promise<Supplier> {
    try {
      return await this.supplierRepo.findByIdAndDelete(supplier_id);
    } catch (err) {
      throw err;
    }
  }
}
