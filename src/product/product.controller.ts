import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/decorator/roles.decorator';
import { Roles } from 'src/auth/enums/roles.enums';
import { Public } from 'src/auth/decorator/IsPuplic.decorator';
import { ProductCategory } from './enums/product-category.enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':branchid')
  @Public()
  findProductbyBranchId(@Param('branchid') branchid: string) {
    return this.productService.findProductsByBranchID(branchid);
  }

  @Get(':branchid/:category')
  @Public()
  findProductbyBranchIdandCategory(
    @Param('branchid') branchid: string,
    @Param('category') category: ProductCategory,
  ) {
    return this.productService.findProductsByBranchIDandCategory(
      branchid,
      category,
    );
  }

  @Post()
  // @Role(Roles.SUPERUSER)
  @Public()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @Role(Roles.SUPERUSER)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Role(Roles.SUPERUSER)
  findOneByID(@Param('id') id: string) {
    return this.productService.findOneByID(id);
  }

  @Patch(':id')
  @Role(Roles.SUPERUSER)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Role(Roles.SUPERUSER)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
