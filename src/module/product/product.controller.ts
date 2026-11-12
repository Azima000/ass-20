import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuardGuard } from '../../common/guard/auth-guard/auth-guard.guard.js';
// import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  /////////////////////////////////////////////////////////////////////////////////
@Post('/create')
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 5 },
  ]),
)
@UseGuards(AuthGuardGuard)
create(
  @Body() body: CreateProductDto,
  @Req() req: any,
  @UploadedFiles()
  files: {
    image?: Express.Multer.File[];
    gallery?: Express.Multer.File[];
  },
) {
  return this.productService.create(body, req.user, files);
}
  /////////////////////////////////////////////////////////////////////////////////
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.productService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
