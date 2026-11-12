import { Module } from '@nestjs/common';
import {  mainCategoryModel } from '../../database/model/mainCategory.model.js';
import { MainCategoryController } from './mainCategory.controller.js';
import { MainCategoryService } from './mainCategory.service.js';
import { SubCategoryController } from './subCategory.controller.js';
import { SubCategoryService } from './subCategory.service.js';
import { subCategoryModel } from '../../database/model/subCategory.model.js';


@Module({
  imports: [mainCategoryModel, subCategoryModel],
  controllers: [MainCategoryController,SubCategoryController],
  providers: [MainCategoryService,SubCategoryService],
})
export class CategoryModule { }
