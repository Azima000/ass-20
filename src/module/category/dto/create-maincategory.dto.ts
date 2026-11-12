import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateMainCategoryDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

}