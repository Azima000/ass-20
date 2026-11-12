import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { IBrand } from "../../common/interfaces/brand.interface.js";
import { generateSlug } from "../../common/utilits/slug.js";


export type BrandDocument = HydratedDocument<IBrand>
@Schema()
export class Brand {

    @Prop({ required: true, type: String })
    name!: string;

    @Prop({ required: false, type: String })
    image?: string;

    @Prop({ required: false, type: String })
    slug!: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: false })
    updatedBy: Types.ObjectId;

    @Prop({ type: Date })
    updateAt: Date;

    @Prop({ type: Date })
    DeletedAt: Date;

    @Prop({ type: Date })
    createAt: Date;

    @Prop({ type: Date })
    restoreAt: Date;

}

export const brandSchema = SchemaFactory.createForClass(Brand);

export const brandModel = MongooseModule.forFeatureAsync([
    {
        name: Brand.name,
        useFactory: () => {
            brandSchema.pre('save', function (this) {
                if (this.isModified("name")) { 
                    this.slug = generateSlug(this.name)
                }
            })

            return brandSchema
        }
    },
]);
