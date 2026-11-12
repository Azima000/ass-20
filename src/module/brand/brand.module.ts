import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller.js';
import { BrandService } from './brand.service.js';
import { brandModel } from '../../database/model/brand.model.js';

@Module({
  imports:[brandModel],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
