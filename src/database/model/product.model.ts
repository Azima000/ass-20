
import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IProduct } from '../../common/interfaces/product.interface.js';
import { generateSlug } from '../../common/utilits/slug.js';

@Schema({ timestamps: true })
export class Product implements IProduct {

    // Product Name
    @Prop({ type: String, required: true, trim: true, minlength: 2, maxlength: 100, })
    name: string;

    // Product Description
    @Prop({ type: String, required: true, trim: true, minlength: 10, maxlength: 2000, })
    description: string;

    // Product Slug
    @Prop({ type: String, unique: true, lowercase: true, trim: true, })
    slug: string;

    // Main Product Image
    @Prop({ type: String, })
    image?: string;

    // Product Gallery
    @Prop({ type: [String], default: [], })
    gallery?: string[];

    // Product SKU / Unique Code
    @Prop({ type: String, required: true, unique: true, trim: true, })
    productId: string;

    // Available Stock
    @Prop({ type: Number, required: true, min: 0, default: 0, })
    stock: number;

    // Product Rating
    @Prop({ type: Number, min: 0, max: 5, default: 0, })
    rating?: number;

    // Original Price
    @Prop({ type: Number, required: true, min: 0, })
    originalPrice: number;

    // Sale Price
    @Prop({ type: Number, min: 0, })
    salePrice?: number;

    // Discount Percentage
    @Prop({ type: Number, min: 0, max: 100, default: 0, })
    discountPercentage?: number;

    // Final Price
    @Prop({ type: Number, required: true, min: 0, })
    finalPrice: number;

    // SubCategory Relationship
    @Prop({ type: Types.ObjectId, ref: 'SubCategory', required: true, })
    subCategoryId: Types.ObjectId;

    // Brand Relationship
    @Prop({ type: Types.ObjectId, ref: 'Brand', required: true, })
    brandId: Types.ObjectId;

    // Created By
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, })
    createdBy: Types.ObjectId;

    // Updated By
    @Prop({ type: Types.ObjectId, ref: 'User', })
    updatedBy?: Types.ObjectId;

    // Soft Delete
    @Prop({ type: Date, })
    deletedAt?: Date;

    // Restore Date
    @Prop({ type: Date, })
    restoredAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductModel = MongooseModule.forFeatureAsync([
  {
    name: Product.name,
    useFactory: () => {
      ProductSchema.pre('validate', function () {
        if (this.isModified('name')) {
          this.slug = generateSlug(this.name);
        }
      });

      return ProductSchema;
    },
  },
]);