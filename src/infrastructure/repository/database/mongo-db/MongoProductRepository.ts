import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../../../domain/entity/Product';
import { ProductRepository } from '../../../../domain/repository/ProductRepository';
import { ProductModel } from './schema/ProductSchema';
import { Model } from 'mongoose';

export class MongoProductRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductModel.name) private productModel: Model<ProductModel>
  ) {}
  async create(product: Product): Promise<Product> {
    const model = {
      name: product.name,
      description: product.description,
      supplierId: product.supplier.id
    };
    const document = await new this.productModel(model).save();
    return this.mapToEntity(document);
  }
  async findById(id: number): Promise<Product> {
    const document = await this.productModel.findById(id);
    return document ? this.mapToEntity(document) : null;
  }

  private mapToEntity(document: any): any {
    return {
      id: 0,
      idMongo: document.id,
      name: document.name,
      description: document.description,
      supplierId: document.supplierId
    };
  }
}
