import { IsString, MinLength, MaxLength, IsNumber, IsPositive, IsOptional, Min, Max, IsMongoId, } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MinLength(20)
    @MaxLength(100)
    name!: string;

    @IsString()
    @MinLength(200)
    @MaxLength(1000)
    description!: string;

    @IsNumber()
    @IsPositive()
    originalPrice!: number;

    @IsNumber()
    @IsPositive()
    stock!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    discountPercentage?: number;

    @IsMongoId()
    subCategoryId!: string;

    @IsMongoId()
    brandId!: string;
}