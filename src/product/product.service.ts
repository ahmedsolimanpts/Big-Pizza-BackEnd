import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientSession, Model } from 'mongoose';
import { Product } from './Model/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { ProductCategory } from './enums/product-category.enums';
import { ProductSubCategory } from './enums/product-subcategory.enum';
import { ProductInterface } from './interface/product.interface';
import { BranchService } from 'src/branch/branch.service';
import { ProductQuantityOperations } from './interface/product-Quantity-Operation.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productRepo: Model<Product>,
    private branchService: BranchService,
  ) {}

  async create(NewProductData: ProductInterface): Promise<Product> {
    try {
      const branch = await this.branchService.findOneBranchByID(
        NewProductData.branch,
      );
      if (!branch) throw new NotFoundException('Wrong Branch Id');
      const product = new this.productRepo(NewProductData);
      return await product.save();
    } catch (err) {
      throw err;
    }
  }

  async findAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepo.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async IsProductsAvailable(products_id: string[]): Promise<boolean> {
    try {
      const products = await this.productRepo.find({ _id: products_id }).exec();
      if (products.length == products_id.length) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  async findProductsByBranchID(branchid: string): Promise<Product[]> {
    try {
      return await this.productRepo.find({ branch: branchid }).exec();
    } catch (err) {
      throw err;
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
    session?: ClientSession,
  ): Promise<boolean> {
    try {
      const product = await this.productRepo
        .findOne({ _id: product_id, branch: branch_id })
        .session(session)
        .exec();
      if (product && product.quantity > 0) {
        return true;
      }

      return false;
    } catch (err) {
      throw err;
    }
  }

  async IsExtraProducts(
    products: string[],
    session?: ClientSession,
  ): Promise<boolean> {
    try {
      const product = await this.productRepo
        .find({ _id: products, is_extra: true })
        .session(session)
        .exec();
      if (product && product.length == products.length) {
        return true;
      }

      return false;
    } catch (err) {
      throw err;
    }
  }

  async IsProductAvailableInBranchWithQuantity(
    product_id: string,
    branch_id: string,
    quantity: number,
    session?: ClientSession,
  ): Promise<boolean> {
    try {
      const product = await this.productRepo
        .findOne({ _id: product_id, branch: branch_id })
        .session(session)
        .exec();
      if (product && product.quantity >= quantity) {
        return true;
      }

      return false;
    } catch (err) {
      throw err;
    }
  }

  async AreProductsAvailableInBranch(
    productIds: string[],
    branchId: string,
    session?: ClientSession,
  ): Promise<boolean> {
    try {
      const products = await this.productRepo
        .find({
          _id: { $in: productIds },
          branch: branchId,
          quantity: { $gt: 0 },
        })
        .session(session)
        .exec();

      return products.length === productIds.length;
    } catch (err) {
      throw err;
    }
  }

  async findOneProductByID(
    product_id: string,
    session?: ClientSession,
  ): Promise<Product> {
    try {
      let query = this.productRepo.findById(product_id);

      // If a session is provided, use it with the query
      if (session) {
        query = query.session(session);
      }

      // Now execute the query with or without the session, as applicable
      return await query.exec();
    } catch (err) {
      throw err;
    }
  }

  async updateOneProductByID(
    product_id: string,
    newProductData: ProductInterface,
  ): Promise<Product> {
    try {
      if (newProductData.branch) {
        const branch = await this.branchService.findOneBranchByID(
          newProductData.branch,
        );

        if (!branch) throw new NotFoundException('Wrong Branch Id');
      }

      return await this.productRepo.findByIdAndUpdate(
        product_id,
        newProductData,
      );
    } catch (err) {
      throw err;
    }
  }

  async updateProductQuantityByProductID(
    product_id: string,
    ProductQuantityNumber: number,
  ): Promise<Product> {
    try {
      if (ProductQuantityNumber > 0) {
        return await this.productRepo.findByIdAndUpdate(product_id, {
          quantity: ProductQuantityNumber,
        });
      }
      throw new BadRequestException('Quantity Must Be Positive');
    } catch (err) {
      throw err;
    }
  }

  async ChangeProductQuantityByProductID(
    product_id: string,
    quantity: number,
    operation: ProductQuantityOperations,
    session?: ClientSession,
  ): Promise<Product> {
    try {
      const product = await this.productRepo
        .findById(product_id)
        .session(session)
        .exec();

      if (!product) {
        throw new Error('Product not found');
      }
      if (operation == ProductQuantityOperations.ADD) {
        product.quantity += quantity;
      } else {
        product.quantity -= quantity;
      }
      return await product.save({ session });
    } catch (err) {
      throw err;
    }
  }

  async removeOneProductByID(product_id: string): Promise<Product> {
    try {
      return await this.productRepo.findByIdAndDelete(product_id);
    } catch (err) {
      console.log(err);
    }
  }
}
