import { Injectable } from 'src/common/Injectable';
import { Product } from 'src/domain/entity/Product';
import { ProductRepository } from 'src/domain/repository/ProductRepository';

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

    this.products.push(product);

    return model;
  }
  async findById(id: number): Promise<Product> {
    const product = this.products.find((product) => product.id == id);
    return product ? product : null;
  }

  private getId(): number {
    const newId = this.id + 1;
    this.id = newId;
    return newId;
  }
}
