import { ProductCategory } from '../enums/product-category.enums';
import { ProductComponents } from '../enums/product-components.enum';
import { ProductSubCategory } from '../enums/product-subcategory.enum';
import { ProductSize } from '../enums/size.enum';

export interface ProductInterface {
  name?: string;

  price?: number;

  production_price?: number;

  branch?: string;

  category?: ProductCategory;

  subcategory?: ProductSubCategory;

  size?: ProductSize;

  components?: ProductComponents[];

  images?: string[];

  quantity?: number;

  can_deliver?: boolean;

  is_sensetive?: boolean;

  is_extra?: boolean;
}
