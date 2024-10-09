import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheService } from '../../application/service/CacheService';
import { CustomExceptionFilter } from '../../common/CustomExceptionFilter';
import { CreateCacheRequest } from './dto/CreateCacheRequest';
import { CustomException } from '../../common/CustomException';
import { FinCacheByKeyRequest } from './dto/FinCacheByKeyRequest';

@Controller('v1/cache')
@ApiTags('cache')
@UseFilters(new CustomExceptionFilter())
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post()
  async create(@Body() request: CreateCacheRequest): Promise<object> {
    try {
      return await this.cacheService.create(request.key, request.value);
    } catch (error) {
      throw new CustomException(error.statusCode, error.message, error.details);
    }
  }

  @Get(':key')
  async findById(@Param() request: FinCacheByKeyRequest): Promise<object> {
    return await this.cacheService.findByKey(request.key);
  }
}
