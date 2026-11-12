import { Types } from 'mongoose';

export interface ISubCategory {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  slug: string;
  image?: string;

  mainCategoryId: Types.ObjectId;

  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}