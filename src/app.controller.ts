import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Cache, CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { CustomCacheInterceptor } from './common/interseptor/cachs.interciptor.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManger:Cache
  ) {}

  @UseInterceptors(CustomCacheInterceptor )
 async getHello() {
  let data = await this.cacheManger.get('test');

  if (data) {
    console.log('inside data');

    return data;
  } else {
    await this.cacheManger.set('test', 'mahmoud sakr');
    // return "data aset"
  }
}

@Get('addPost')
async addPost() {
  let deleteCache = await this.cacheManger.del('test');

  return true;
}

 

}
