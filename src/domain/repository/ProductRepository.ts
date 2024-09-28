import { Product } from '../entity/Product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findById(id: number): Promise<Product>;
}
