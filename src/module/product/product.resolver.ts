import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "../../database/model/product.model.js";
import { Model } from "mongoose";
import { GetProductDto, PaginationGQLDTO } from "./dto/product.dto.js";
import { UseGuards } from "@nestjs/common";
import { AuthGuardGuard } from "../../common/guard/auth-guard/auth-guard.guard.js";
// import { productDto } from "./dto/product.dto.js";




@Resolver()
export class productResolver {

    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>,) { }

    @Query(() => String, { name: "azima", description: "welcome in gql Api", nullable: false })
    Welcome(
        @Args('email') email: string,
        @Args('name') name: string,
        @Args('password') password: string
    ) {
        console.log(email, name, password);
        return "welcome in my project "

    }
    //////////////////////////////////////////////////////////////////////
    @UseGuards(AuthGuardGuard)
    @Query(() => [GetProductDto], { name: "sayHi" })
    async getAllProducts(
        @Args() args: PaginationGQLDTO
    ) {

        const page = args.page ?? 1;
        const limit = args.limit ?? 10;

        const skip = (page - 1) * limit;

        const products = await this.productModel
            .find()
            .skip(skip)
            .limit(limit);

        return products;
    }

}

// @Mutation(() => String, { name: "welcome", description: "welcome in gql Api", nullable: false })
// welcomeMutation(): string {
//     return "welcome in my project "
// }
