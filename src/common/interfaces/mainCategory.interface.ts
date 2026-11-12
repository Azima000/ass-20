import { Types } from 'mongoose';

export interface IMainCategory {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  slug: string;
  image?: string;

  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}