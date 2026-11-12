import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubCategory } from '../../database/model/subCategory.model.js';
import { MainCategory } from '../../database/model/mainCategory.model.js';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto.js';


@Injectable()
export class SubCategoryService {

    constructor(
        @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategory>,
        @InjectModel(MainCategory.name) private readonly mainCategoryModel: Model<MainCategory>,
    ) { }
    //////////////////////////////////////////////////////////////////////////
    async create(createSubCategoryDto: CreateSubCategoryDto, userId: Types.ObjectId,) {

        const { mainCategoryId } = createSubCategoryDto;

        // Check if MainCategory exists
        const mainCategory = await this.mainCategoryModel.findById(mainCategoryId)

        if (!mainCategory) {
            throw new NotFoundException('Main Category not found');
        }
        
        const subCategory = await this.subCategoryModel.create({
            ...createSubCategoryDto,
            // image: file?.filename,
            createdBy: userId
        });

        return {
            message: 'SubCategory created successfully',
            data: subCategory,
        };
    }
    ////////////////////////////////////////////////////////////////////////////
    //     async update(
    //   subCategoryId: string,
    //   updateSubCategoryDto: UpdateSubCategoryDto,
    //   userId: Types.ObjectId,
    //   file?: Express.Multer.File,
    // ) {
    //   const subCategory = await this.subCategoryModel.findById(subCategoryId);

    //   if (!subCategory) {
    //     throw new NotFoundException('SubCategory not found');
    //   }

    //   if (updateSubCategoryDto.mainCategoryId) {
    //     const mainCategory = await this.mainCategoryModel.findById(
    //       updateSubCategoryDto.mainCategoryId,
    //     );

    //     if (!mainCategory) {
    //       throw new NotFoundException('Main Category not found');
    //     }
    //   }

    //   Object.assign(subCategory, updateSubCategoryDto);

    //   if (file) {
    //     // هنضيف كود رفع الصورة على S3 هنا
    //   }

    //   subCategory.updatedBy = userId;

    //   return await subCategory.save();
    // }
    ////////////////////////////////////////////////////////////////////////////
    async findAll() {
        return await this.subCategoryModel.find().populate('mainCategoryId', 'name')
    }
    ////////////////////////////////////////////////////////////////////////////
    async findOne(subCategoryId: string) {
        const subCategory = await this.subCategoryModel.findById(subCategoryId).populate('mainCategoryId', 'name')

        if (!subCategory) {
            throw new NotFoundException('SubCategory not found');
        }

        return subCategory;
    }
    ////////////////////////////////////////////////////////////////////////////
    async delete(subCategoryId: string) {
        const subCategory = await this.subCategoryModel.findByIdAndDelete(
            subCategoryId,
        );

        if (!subCategory) {
            throw new NotFoundException('SubCategory not found');
        }

        return {
            message: 'SubCategory deleted successfully',
        };
    }
}