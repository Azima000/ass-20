import { ArgsType, Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { GetCategoryGqlDto } from "../../category/dto/create-subcategory.dto.js";
import { IsInt, IsOptional, Min } from "class-validator";


@ArgsType()
export class productDto{
    @Field(()=>String, { name: "email", description: "email of product", nullable: false })
    email:string

    @Field(()=>String, { name: "name", description: "name of product", nullable: false })
    name:string

    @Field(()=>String, { name: "password", description: "password of product", nullable: false })
    password:string
}

///////////////////////////////////////////////////////////////
@ObjectType()
export class GetProductDto {

    @Field(() => ID)
    _id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Field(() => GetCategoryGqlDto,{name:"categoryId"})
    categoryId: GetCategoryGqlDto;
}
///////////////////////////////////////////////////////////////
@ArgsType()
export class PaginationGQLDTO {

    @Field(() => Int)
    @IsInt()
    @IsOptional()
    @Min(1)
    page: number;

    @Field(() => Int)
    @IsInt()
    @IsOptional()
    @Min(1)
    limit: number;

    @Field(() => Int)
    @IsInt()
    @IsOptional()
    @Min(1)
    size: number;
}