import { ProductRepository } from 'src/domain/repository/ProductRepository';
import { SupplierRepository } from 'src/domain/repository/SupplierRepository';
import { CreateProductDto } from '../dto/CreateProductDto';
import { Product } from 'src/domain/entity/Product';
import { Injectable } from 'src/common/Injectable';
import { CustomException } from 'src/common/CustomException';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly supplierRepository: SupplierRepository,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = new Product();
    const supplier = await this.supplierRepository.findById(dto.supplierId);

    if (!supplier)
      throw new CustomException(404, 'Not Found', {
        message: [`Supplier with id ${dto.supplierId} does not exists`],
      });

    product.name = dto.name;
    product.description = dto.description;
    product.supplier = supplier;

    return this.productRepository.create(product);
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product)
      throw new CustomException(404, 'Not Found', {
        message: [`Product with id ${id} does not exists`],
      });
    return product;
  }
}
