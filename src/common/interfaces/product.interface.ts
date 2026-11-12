import { Types } from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
    slug: string;
    image?: string;
    gallery?: string[];
    productId: string;
    stock: number;
    rating?: number;
    originalPrice: number;
    salePrice?: number;
    discountPercentage?: number;
    finalPrice: number;

    // Relationships
    subCategoryId: Types.ObjectId;
    brandId: Types.ObjectId;
    createdBy: Types.ObjectId;
    updatedBy?: Types.ObjectId;

    deletedAt?: Date;
    restoredAt?: Date;
}