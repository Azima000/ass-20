import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { MainCategory } from './mainCategory.model.js';
import { generateSlug } from '../../common/utilits/slug.js';

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, unique: true, required: true, trim: true })
  slug?: string;

  @Prop({ type: Types.ObjectId, ref: MainCategory.name, required: true })
  mainCategoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy?: Types.ObjectId;

  @Prop({ type: String, trim: true })
  description?: string;

  @Prop({ type: String })
  image?: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

SubCategorySchema.pre('validate', function () {
  if (this.isModified('name') || !this.slug) {
    this.slug = generateSlug(this.name);
  }
});

export const subCategoryModel = MongooseModule.forFeature([
  {
    name: SubCategory.name,
    schema: SubCategorySchema,
  },
]);