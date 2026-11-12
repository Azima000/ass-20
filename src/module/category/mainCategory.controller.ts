import { Controller, Post, Get, Patch, Delete, Body, Param, Req, UseGuards, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { AuthGuardGuard } from '../../common/guard/auth-guard/auth-guard.guard.js';
import { MainCategoryService } from './mainCategory.service.js';
import { CreateMainCategoryDto } from './dto/create-maincategory.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('main-category')
@UseGuards(AuthGuardGuard)
export class MainCategoryController {
  constructor(
    private readonly mainCategoryService: MainCategoryService,
  ) { }

  // Create Main Category
  @Post("/create")
   @UseGuards(AuthGuardGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createMainCategoryDto: CreateMainCategoryDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    return await this.mainCategoryService.create(
      createMainCategoryDto,
      req.user.id,
    );
  }

  // Get All Main Categories
  @Get("/get-all-main-category")
  async findAll() {
    return await this.mainCategoryService.findAll();
  }

  // Get Main Category By ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mainCategoryService.findOne(id);
  }

  // // Update Main Category
  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateMainCategoryDto: UpdateMainCategoryDto,
  //   @Req() req,
  // ) {
  //   return await this.mainCategoryService.update(
  //     id,
  //     updateMainCategoryDto,
  //     req.user.id,
  //   );
  // }

  // Delete Main Category
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.mainCategoryService.remove(id);
  }
}