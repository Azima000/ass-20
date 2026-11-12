import { Field, ID, ObjectType } from '@nestjs/graphql';
import {IsMongoId,IsNotEmpty,IsOptional,IsString, MinLength,} from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  
  @IsMongoId()
  @IsNotEmpty()
  mainCategoryId: string;
}

@ObjectType()
export class GetCategoryGqlDto {

    @Field(() => ID)
    _id: string;

    @Field(() => String)
    name: string;

}