import { ExecutionContext, Injectable } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CLASSIFY_CACHE_KEY_FILTER } from 'src/utils/constant';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    // const request = context.switchToHttp().getRequest();
    // const key = `${CLASSIFY_CACHE_KEY_FILTER}|species|${request?.query?.species}|`;

    return CLASSIFY_CACHE_KEY_FILTER;
  }
}
