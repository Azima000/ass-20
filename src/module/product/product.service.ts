import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { UpdateProductDto } from './dto/update-product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../../database/model/brand.model.js';
import { Model, Types } from 'mongoose';
import { randomUUID } from 'crypto';
import { Product } from '../../database/model/product.model.js';
import { SubCategory } from '../../database/model/subCategory.model.js';


@Injectable()
export class ProductService {

  constructor(@InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(SubCategory.name) private readonly SubCategoryModel: Model<SubCategory>) { }
  ///////////////////////////////////////////////////////////////////////////////
  async create(body: CreateProductDto, user: any, files?: { image?: Express.Multer.File[]; gallery?: Express.Multer.File[]; },) {
    const { name, description, originalPrice, discountPercentage, stock, subCategoryId, brandId, } = body;

    const brandObjectId = new Types.ObjectId(brandId);
    const subCategoryObjectId = new Types.ObjectId(subCategoryId);

    const existBrand = await this.brandModel.findById(brandObjectId);
    const existCategory = await this.SubCategoryModel.findById(subCategoryObjectId);

    if (!existBrand) {
      throw new NotFoundException('brand not found');
    }

    if (!existCategory) {
      throw new NotFoundException('subcategory not found');
    }

    const finalPrice = Number((originalPrice - (originalPrice * (discountPercentage ?? 0)) / 100).toFixed(2),);

    let image: string | undefined;
    let gallery: string[] = [];

    if (files?.image?.length) {
      image = files.image[0].path;
    }

    if (files?.gallery?.length) {
      gallery = files.gallery.map((item) => item.path);
    }

    const productId = randomUUID().slice(0, 10);

    const addProduct = await this.productModel.create({
      name,
      description,
      originalPrice,
      stock,
      discountPercentage,
      subCategoryId: subCategoryObjectId,
      brandId: brandObjectId,
      productId,
      finalPrice,
      image,
      gallery,
      createdBy: new Types.ObjectId(user.id),
    });

    return addProduct;
  }
  ///////////////////////////////////////////////////////////////////////////////

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
  ///////////////////////////////////////////////////////////////////////////////

  async update(id: number, body: any) {

    let {name}= body

    let existProduct = await this.productModel.findById(id)
    if (!existProduct) {
      new NotFoundException("Product not found")
    }
    let updateProduct =await this.productModel.findByIdAndUpdate(id,{name},{new:true})
    if (updateProduct) {
      return updateProduct
    }
    else{
      throw new BadRequestException("Product not updated")
    }
  }
  ///////////////////////////////////////////////////////////////////////////////

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
