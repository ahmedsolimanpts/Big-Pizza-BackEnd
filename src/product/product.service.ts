import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './Model/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { ProductCategory } from './enums/product-category.enums';
import { ProductSubCategory } from './enums/product-subcategory.enum';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productRepo: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = new this.productRepo(createProductDto);
      return await product.save();
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepo.find().exec();
    } catch (err) {
      console.log(err);
    }
  }
  async findProductsByBranchID(branchid: string): Promise<Product[]> {
    try {
      return await this.productRepo.find({ branch: branchid }).exec();
    } catch (err) {
      console.log(err);
    }
  }

  async findProductsByBranchIDandCategory(
    branchid: string,
    category: ProductCategory,
  ): Promise<Product[]> {
    try {
      return await this.productRepo.find({ branch: branchid, category }).exec();
    } catch (err) {
      console.log(err);
    }
  }

  async findProductsByBranchIDandCategoryandSubCategory(
    branchid: string,
    category: ProductCategory,
    subcategory: ProductSubCategory,
  ): Promise<Product[]> {
    try {
      return await this.productRepo
        .find({ branch: branchid, category, subcategory })
        .exec();
    } catch (err) {
      console.log(err);
    }
  }

  async findOneByID(id: string): Promise<Product> {
    try {
      return await this.productRepo.findById(id).exec();
    } catch (err) {
      console.log(err);
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.productRepo.findByIdAndUpdate(id, updateProductDto);
    } catch (err) {
      console.log(err);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      return await this.productRepo.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
