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

  async IsProductAvailableInBranch(
    product_id: string,
    branch_id: string,
  ): Promise<boolean> {
    try {
      const product = await this.productRepo
        .findOne({ _id: product_id, branch: branch_id })
        .exec();
      if (product && product.quantity > 0) {
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
    }
  }

  async IsProductAvailableInBranchWithQuantity(
    product_id: string,
    branch_id: string,
    quantity: number,
  ): Promise<boolean> {
    try {
      const product = await this.productRepo
        .findOne({ _id: product_id, branch: branch_id })
        .exec();
      if (product && product.quantity >= quantity) {
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
    }
  }

  async SubtractproductQuantity(
    product_id: string,
    quantity: number,
  ): Promise<Product> {
    try {
      const product = await this.productRepo.findById(product_id).exec();
      const new_qantity = product.quantity - quantity;
      product.quantity = new_qantity;
      return await product.save();
    } catch (err) {
      throw err;
    }
  }

  async areProductsAvailable(
    productIds: string[],
    branchId: string,
  ): Promise<boolean> {
    const products = await this.productRepo
      .find({
        _id: { $in: productIds },
        branch: branchId,
        quantity: { $gt: 0 },
      })
      .exec();

    return products.length === productIds.length;
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
