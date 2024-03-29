import { Injectable } from '@nestjs/common';
import { SupplierItems } from '../Model/Supplier-Items.model';
import { CreateSupplierItemInterface } from '../interface/Supplier Items/Create-Supplier-Items.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSupplierItemInterface } from '../interface/Supplier Items/Update-Supplier-Items.interface';

@Injectable()
export class SupplierItemsService {
  constructor(
    @InjectModel(SupplierItems.name)
    private readonly supplierItemsRepo: Model<SupplierItems>,
  ) {}

  async create(
    createSupplierData: CreateSupplierItemInterface,
  ): Promise<SupplierItems> {
    try {
      const newSupplier = new this.supplierItemsRepo(createSupplierData);
      return await newSupplier.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<SupplierItems[]> {
    try {
      return await this.supplierItemsRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllBySupllier(supplier_id: string): Promise<SupplierItems[]> {
    try {
      return await this.supplierItemsRepo
        .find({ supplier: supplier_id })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: string): Promise<SupplierItems> {
    try {
      return await this.supplierItemsRepo.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async updateOneByID(
    id: string,
    updatedSupplierIemData: UpdateSupplierItemInterface,
  ): Promise<SupplierItems> {
    try {
      return await this.supplierItemsRepo.findByIdAndUpdate(
        id,
        updatedSupplierIemData,
      );
    } catch (err) {
      throw err;
    }
  }

  async removeOneSupplierByID(id: string): Promise<SupplierItems> {
    try {
      return await this.supplierItemsRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
