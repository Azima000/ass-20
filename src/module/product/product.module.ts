import { Module } from '@nestjs/common';
import { ProductController } from './product.controller.js';
import { ProductService } from './product.service.js';
import { brandModel } from '../../database/model/brand.model.js';
import { ProductModel } from '../../database/model/product.model.js';
import { subCategoryModel } from '../../database/model/subCategory.model.js';
import { productResolver } from './product.resolver.js';

@Module({
  imports: [brandModel, ProductModel,subCategoryModel],
  controllers: [ProductController],
  providers: [ProductService,productResolver],
})
export class ProductModule { }
