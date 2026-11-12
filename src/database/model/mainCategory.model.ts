import {MongooseModule, Prop,Schema,SchemaFactory,} from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { generateSlug } from '../../common/utilits/slug.js';

@Schema({ timestamps: true })
export class MainCategory {
  @Prop({type: String, required: true,trim: true,})
  name: string;

  @Prop({type: String,trim: true,})
  description?: string;

  @Prop({type: String,unique: true,required: true,trim: true,})
  slug: string;

  @Prop({ type: String,})
  image?: string;

  @Prop({type: Types.ObjectId, ref: 'User',required: true,})
  createdBy: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: 'User',})
  updatedBy?: Types.ObjectId;
}

export const MainCategorySchema =
  SchemaFactory.createForClass(MainCategory);

export const mainCategoryModel = MongooseModule.forFeatureAsync([
  {
    name: MainCategory.name,
    useFactory: () => {
      MainCategorySchema.pre('validate', function () {
        if (this.isModified('name')) {
          this.slug = generateSlug(this.name);
        }
      });

      return MainCategorySchema;
    },
  },
]);