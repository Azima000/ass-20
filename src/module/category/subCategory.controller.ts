import { Controller, Post, Get, Patch, Delete, Body, Param, Req, UseGuards, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubCategoryService } from './subCategory.service.js';
import { AuthGuardGuard } from '../../common/guard/auth-guard/auth-guard.guard.js';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto.js';

@Controller('sub-category')
@UseGuards(AuthGuardGuard)
export class SubCategoryController {
    constructor(
        private readonly subCategoryService: SubCategoryService,
    ) { }

    // Create SubCategory
    @Post("/create")
   @UseGuards(AuthGuardGuard)
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() createSubCategoryDto: CreateSubCategoryDto,
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any,
    ) {
        return this.subCategoryService.create(
            createSubCategoryDto,
            req.user.id,
            // file,
        );
    }

    // Get All SubCategories
    @Get("/get-all-subcategory")
    async findAll() {
        return this.subCategoryService.findAll();
    }

    // Get One SubCategory
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.subCategoryService.findOne(id);
    }

    // Update SubCategory
    // @Patch(':id')
    // @UseInterceptors(FileInterceptor('image'))
    // async update(
    //     @Param('id') id: string,
    //     @Body() updateSubCategoryDto: UpdateSubCategoryDto,
    //     @UploadedFile() file: Express.Multer.File,
    //     @Req() req,
    // ) {
    //     return this.subCategoryService.update(
    //         id,
    //         updateSubCategoryDto,
    //         req.user.id,
    //         file,
    //     );
    // }

    // Delete SubCategory
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.subCategoryService.delete(id);
    }
}
