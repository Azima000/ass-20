import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IBrand } from '../../common/interfaces/brand.interface.js';
import { Brand } from '../../database/model/brand.model.js';
import { InjectModel } from '@nestjs/mongoose';
import { generateSlug } from '../../common/utilits/slug.js';

@Injectable()
export class BrandService {
    constructor(@InjectModel(Brand.name) private readonly Brand_Model: Model<IBrand>) {

    }

    async getAllBrands() {
        let data = await this.Brand_Model.find()
        return data
    }
    ///////////////////////////////////////////////////////
    async createBrand(body: { name: string; createdBy: string }) {
        const { name, createdBy } = body;
        const slug = generateSlug(name)
        const existingCategory = await this.Brand_Model.findOne({ slug, });

        if (existingCategory) {
            throw new ConflictException('Brand already exists');
        }
        const addBrand = await this.Brand_Model.create({ name, createdBy });

        return {
            message: 'Added Brand',
            addBrand,
        };
    }
    ////////////////////////////////////////////////////////////////
    async updateBrand(body: any, brandId: string) {
        let { name } = body;

       
        let updatedBrand = await this.Brand_Model.findByIdAndUpdate(brandId, { name }, { new: true });

        if (!updatedBrand) {
            throw new NotFoundException("brand not found");
        }

        return {
            message: "brand updated",
            updatedBrand
        };
    }
    /////////////////////////////////////////////////////////////////////////////
    async deleteBrand(brandId: string) {
        let deletedBrand = await this.Brand_Model.findByIdAndDelete(brandId);

        if (!deletedBrand) {
            throw new NotFoundException('brand not found');
        } else {
            return { message: "brand deleted", deletedBrand };
        }
    }
}
