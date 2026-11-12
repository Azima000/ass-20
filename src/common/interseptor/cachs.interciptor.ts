import {Injectable,NestInterceptor, ExecutionContext,CallHandler} from '@nestjs/common';
import { Observable, of, mergeMap } from 'rxjs';
import { RedisService } from '../service/Redis Service/redis.service.js';

@Injectable()
export class CustomCacheInterceptor implements NestInterceptor {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  async intercept( context: ExecutionContext, next: CallHandler ): Promise<Observable<any>> {

    let url: string;
    const ttl = 10;

    switch (context.getType()) {
      case 'http':
        url = context.switchToHttp().getRequest().url;
        break;

      default:
        return next.handle();
    }

    // Generate cache key
    const cacheKey = this.redisService.GetCacheKey(url);

    // Check Redis
    const data = await this.redisService.get(cacheKey);

    // If data exists, return it
    if (data) {
      console.log('Data From Redis');
      return of(data);
    }

    // If data doesn't exist, execute Controller
    console.log('Data From Controller');

    return next.handle().pipe( mergeMap(async (value) => {

        // Save response in Redis
        await this.redisService.set({
          key: cacheKey,
          value,
          ttl,
        });

        return value;
      }),
    );
  }
}
