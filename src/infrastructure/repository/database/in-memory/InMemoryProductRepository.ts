import { Injectable } from '../../../../common/Injectable';
import { Product } from '../../../../domain/entity/Product';
import { ProductRepository } from '../../../../domain/repository/ProductRepository';

@Injectable()
export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];
  private id = 0;

  async create(product: Product): Promise<Product> {
    const model = new Product();

    model.id = this.getId();
    model.description = product.description;
    model.name = product.name;
    model.supplier = product.supplier;

    this.products.push(model);

    return model;
  }
  async findById(id: number): Promise<Product> {
    const product = await this.products.find((product) => product.id == id);
    return product ? product : null;
  }

  private getId(): number {
    const newId = this.id + 1;
    this.id = newId;
    return newId;
  }
}
