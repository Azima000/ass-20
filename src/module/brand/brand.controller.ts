import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

import { BrandService } from './brand.service.js';
import { AuthGuardGuard } from '../../common/guard/auth-guard/auth-guard.guard.js';



@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Get('/get-all-brands')
  async getAllBrands() {
    return await this.brandService.getAllBrands();
  }
  ////////////////////////////////////////////////////////////////
  @UseGuards(AuthGuardGuard)
  @Post('/create-brand')
  async createBrand(
    @Body() body: any,
    @Req() request: any,
  ) {
    const createdBy = request.user.id;

    return await this.brandService.createBrand({
      name: body.name,
      createdBy,
    });
  }
  ////////////////////////////////////////////////////
  @UseGuards(AuthGuardGuard)
  @Put('/update-brand/:brandId')
  async updateBrand(
    @Body() body: any,
    @Param() params: any
  ) {
    let data = await this.brandService.updateBrand(body, params.brandId);
    return data;
  }
  //////////////////////////////////////////////////////
  @UseGuards(AuthGuardGuard)
  @Delete('/delete-brand/:brandId')
  async deleteBrand(@Param() param: any) {
    let data = await this.brandService.deleteBrand(param.brandId);
    return data;
  }
}