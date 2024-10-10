import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { CreateProductRequest } from './dto/CreateProductRequest';
import { ProductService } from '../../application/service/ProductService';
import { FindProductByIdRequest } from './dto/FindProductByIdRequest';
import { CustomException } from '../../common/CustomException';
import { CustomExceptionFilter } from '../../common/CustomExceptionFilter';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/AuthGuard';

@Controller('v1/products')
@UseFilters(new CustomExceptionFilter())
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() request: CreateProductRequest): Promise<object> {
    try {
      const response = await this.productService.create(request);
      return response;
    } catch (error) {
      throw new CustomException(error.statusCode, error.message, error.details);
    }
  }

  @Get(':id')
  async findById(@Param() request: FindProductByIdRequest): Promise<object> {
    return this.productService.findById(request.id);
  }
}
