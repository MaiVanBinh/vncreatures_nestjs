import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { CLASSIFY_CACHE_KEY_FILTER } from 'src/utils/constant';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { HttpCacheInterceptor } from './interceptor/httpCache.interceptor';

@Controller('classify')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @Get('filter')
  @CacheKey(CLASSIFY_CACHE_KEY_FILTER)
  @UseInterceptors(HttpCacheInterceptor)
  @UseGuards(JwtAuthGuard)
  async getFilterData(@Query('species') species: number) {
    species = species ? species : 1;
    return this.classifyService.getFilterData();
  }
}
