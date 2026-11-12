import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MainCategory } from '../../database/model/mainCategory.model.js';
import { CreateMainCategoryDto } from './dto/create-maincategory.dto.js';
import { generateSlug } from '../../common/utilits/slug.js';


@Injectable()
export class MainCategoryService {
  constructor(
    @InjectModel(MainCategory.name) private readonly mainCategoryModel: Model<MainCategory>,) { }

  // Create Main Category
async create( createMainCategoryDto: CreateMainCategoryDto,userId: Types.ObjectId) {
  const slug = generateSlug(createMainCategoryDto.name);

  const existingCategory = await this.mainCategoryModel.findOne({ slug,});

  if (existingCategory) {
    throw new ConflictException('Main Category already exists');
  }

  // const imageUrl = file ? await this.s3Service.uploadfile(file) : undefined;

  const category = await this.mainCategoryModel.create({
    ...createMainCategoryDto,
    // image: imageUrl,
    createdBy: userId,
  });

  return category;
}

  // Get All Main Categories
  async findAll() {
    return await this.mainCategoryModel.find().sort({ createdAt: -1 });
  }

  // Get Main Category By ID
  async findOne(id: string) {
    const category = await this.mainCategoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Main Category not found');
    }

    return category;
  }

  // Update Main Category
  // async update(
  //   id: string,
  //   updateMainCategoryDto: UpdateMainCategoryDto,
  //   userId: Types.ObjectId,
  // ) {
  //   const category = await this.findOne(id);

  //   Object.assign(category, updateMainCategoryDto);

  //   category.updatedBy = userId;

  //   await category.save();

  //   return category;
  // }

  // Delete Main Category
  async remove(id: string) {
    const category = await this.mainCategoryModel.findByIdAndDelete(id);

    if (!category) {
      throw new NotFoundException('Main Category not found');
    }

    return {
      message: 'Main Category deleted successfully',
    };
  }
}