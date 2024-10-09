import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '../../../../common/Injectable';
import { Product } from '../../../../domain/entity/Product';
import { ProductRepository } from '../../../../domain/repository/ProductRepository';
import { ProductModel } from './model/ProductModel';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private productRepository: Repository<ProductModel>
  ) {}

  async create(product: Product): Promise<Product> {
    await this.productRepository.save(product);
    return product;
  }
  async findById(id: number): Promise<Product> {
    return this.productRepository.findOne({
      relations: { supplier: true },
      where: { id }
    });
  }
}
